// /* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toaster from "../configs/toaster";
import { useUpdateProductMutation, useUploadProductMutation } from "../redux/business/slices/productSlice";

const removeOrAddToArray = (value, array, setter) => {
    const index = array.indexOf(value);
    if (index > -1) {
        setter(array.filter((item) => item !== value));
    } else {
        setter([...array, value]);
    }
};

const useProductForm = (categories = [], dataToEdit) => {
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [newSpecKey, setNewSpecKey] = useState("");
    const [specValue, setSpecValue] = useState("");
    const [specInfo, setProdSpecs] = useState({});
    const [productGroups, setGroups] = useState([]);
    const [files, setFiles] = useState([]);
    const [fromCollection, setFromCollection] = useState(null);
    const [localFiles, setLocalFiles] = useState([]);
    const [delivery, selectDelivery] = useState(["pickup"]);
    const [genPayload, getGenPayload] = useState(null);
    const [descLoading, setDescLoading] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [uploadHandler, { isLoading: uploading }] =
        useUploadProductMutation();
    const [updateHandler, { isLoading: updating }] = useUpdateProductMutation()

    const [formData, setFormData] = useState({
        prodName: "",
        prodPrice: "",
        prodKey: "",
        prodInfo: "",
        specifications: { sizes: selectedSizes },
        images: [],
        newImages: [],
        totInStock: "",
        subCollectionName: "",
        collectionName: "",
        category: "",
        subcategory: "",
        productGroup: "",
        delivery,
    });

    const prodToEdit = (dataToEdit?.data ?? {});

    useEffect(() => {
        setFromCollection(categories.filter((x) => x._id === formData.category)[0] || null);
    }, [formData.category, prodToEdit]);

    const reset = () => {
        setFormData({
            prodName: "",
            prodPrice: "",
            prodKey: "",
            prodInfo: "",
            specifications: { sizes: [], variations: {} },
            images: [],
            newImages: [],
            totInStock: "",
            subCollectionName: "",
            collectionName: "",
            category: "",
            subcategory: "",
            productGroup: "",
            delivery: ["pickup"],
        });
        setFiles([]);
        setLocalFiles([]);
        setSelectedSizes([]);
        setNewSpecKey("");
        setSpecValue("");
        setProdSpecs("");
    };

    useEffect(() => {
        if (dataToEdit) {
            setFormData({
                prodName: prodToEdit.prodName || "",
                prodPrice: prodToEdit.prodPrice?.toString() || "",
                video: prodToEdit.video,
                prodKey: prodToEdit.prodKey || "",
                prodInfo: prodToEdit.prodInfo || "",
                images: prodToEdit.images || [],
                newImages: [],
                totInStock: prodToEdit.totInStock?.toString() || "",
                collectionId: prodToEdit.collectionId,
                subCollection: prodToEdit.subCollection,
                subCollectionName: prodToEdit.subCollectionName || "",
                collectionName: prodToEdit.collectionName || "",
                subcategory: prodToEdit.subcategory || "",
                productGroup: prodToEdit.productGroup || "",
                delivery: prodToEdit.delivery || ["pickup"],
                specifications: prodToEdit.specifications || {},
                category: prodToEdit.category || "",
                _id: prodToEdit._id,
            });

            selectDelivery(prodToEdit.delivery || ["pickup"]);
            setProdSpecs(prodToEdit.specifications || {});
            setFromCollection(categories.filter((x) => x._id === prodToEdit.category)[0] || null);
            fromCollection?.sub_category.map((sub) => sub._id === prodToEdit.subcategory && setGroups(sub.groups || []));
            productGroups.map((group) => group._id === prodToEdit.productGroup && setProdSpecs(group.spec || ""));
        }
    }, [formData.category, prodToEdit?.prodName, categories, fromCollection?.sub_category, productGroups]);
    // formData.category, dataToEdit, prodToEdit, categories, fromCollection?.sub_category, productGroups
    const handleChange = (prop) => {
        return (value) => {
            setFormData((prev) => ({ ...prev, [prop]: value }));
        };
    };

    const handleTextChange = (prop, value) => {
        const sanitizedValue = value.replace(/[()+=]/g, "");
        setFormData((prev) => ({ ...prev, [prop]: sanitizedValue }));
    };

    const handleNumericChange = (prop, value) => {
        const numericValue = value.replace(/[^0-9.]/g, "");
        setFormData((prev) => ({ ...prev, [prop]: numericValue }));
    };

    const deliveryHandler = (value) => {
        removeOrAddToArray(value, delivery, selectDelivery);
        setFormData((prev) => ({
            ...prev,
            delivery: delivery.includes(value)
                ? delivery.filter((d) => d !== value)
                : [...delivery, value],
        }));
    };

    const handleChangeCategory = (selectedCategory) => {
        const { category, _id } = selectedCategory;
        getGenPayload((prev) => ({
            ...prev,
            category,
        }));

        setFormData((prev) => ({
            ...prev,
            category: _id,
            collectionName: category,
            subcategory: "",
            subCollectionName: "",
            productGroup: "",
        }));

        setGroups([]);
        setProdSpecs("");
    };

    const handleSubCateSelection = (selectedSubCategory) => {
        const { _id, groups, label } = selectedSubCategory;
        getGenPayload((prev) => ({ ...prev, subcategory: label }));
        setFormData((prev) => ({
            ...prev,
            subcategory: _id,
            subCollectionName: label,
            productGroup: "",
        }));
        setGroups(groups || []);
        setProdSpecs("");
    };

    const handleProductGroupSelection = (selectedProductGroup) => {
        const { spec, _id } = selectedProductGroup;
        setFormData((prev) => ({
            ...prev,
            productGroup: _id,
        }));
        setProdSpecs(spec || "");
    };

    const handleSizeSelection = (size) => {
        const newSizes = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size];

        setSelectedSizes(newSizes);
        setFormData((prev) => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                sizes: newSizes,
            },
        }));
    };

    const addCustomSpec = () => {
        if (newSpecKey.trim() && specValue.trim()) {
            setFormData((prev) => ({
                ...prev,
                specifications: {
                    variations: {
                        ...prev.specifications.variations,
                        [newSpecKey.trim()]: specValue.trim(),
                    }
                },
            }));
            setNewSpecKey("");
            setSpecValue("");
        }
    };

    const removeCustomSpec = (specKey) => {
        setFormData((prev) => {
            const newSpecKeys = { ...prev.specifications };
            delete newSpecKeys[specKey];
            return {
                ...prev,
                specifications: newSpecKeys,
            };
        });
    };

    const handleImageUpload = async (imageUri, base64) => {
        setLocalFiles((prev) => [...prev, imageUri]);
        const mimeType = imageUri.split(".").pop() || "jpeg";
        const dataUri = `data:image/${mimeType};base64,${base64}`;

        setFormData((prev) => ({
            ...prev,
            newImages: [...prev.newImages, dataUri],
        }));
    };

    const removeImage = (index) => {
        setLocalFiles((prev) => [...prev.filter((_, i) => i !== index)]);
        setFormData((prev) => ({
            ...prev,
            newImages: prev.newImages.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            "prodName",
            "prodPrice",
            "prodInfo",
            "category",
            "subcategory",
            "totInStock",
        ];

        return requiredFields.every((field) => {
            const value = formData[field];
            return value && value.toString().trim() !== "";
        });
    };

    const handleSubmit = async () => {
        console.log("Submitting form with data:", formData);
        console.log({ formData });

        try {
            const handler = dataToEdit ? updateHandler : uploadHandler
            const result = await handler(
                {
                    ...formData,
                    delivery,
                    specifications: {
                        ...formData.specifications,
                        sizes: selectedSizes,
                    },
                    newImages: files,
                },
            ).unwrap((res) => res.type === "success" && reset());

            toaster(result);
        } catch (error) {

        }
    };


    return {
        formData,
        selectedSizes,
        newSpecKey,
        specValue,
        specInfo,
        productGroups,
        files,
        localFiles,
        delivery,
        genPayload,
        descLoading,
        loading: uploading || updating,
        fromCollection,
        setFormData,
        setSelectedSizes,
        setNewSpecKey,
        setSpecValue,
        setProdSpecs,
        setGroups,
        setFiles,
        setLocalFiles,
        selectDelivery,
        getGenPayload,
        setDescLoading,
        handleChange,
        handleTextChange,
        handleNumericChange,
        deliveryHandler,
        handleChangeCategory,
        handleSubCateSelection,
        handleProductGroupSelection,
        handleSizeSelection,
        handleSubmit,
        addCustomSpec,
        removeCustomSpec,
        handleImageUpload,
        removeImage,
        reset,
        validateForm,
    };
};

export default useProductForm;