"use client"
import { useEffect } from "react";

const VoiceflowChatComponent = () => {
  useEffect(() => {
    (function (d, t) {
      var v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: "6664f873f1a5985517ba2ec4" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      };
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      v.type = "text/javascript";
      s.parentNode.insertBefore(v, s);
    })(document, "script");
  }, []);

  return;
};

export default VoiceflowChatComponent;
