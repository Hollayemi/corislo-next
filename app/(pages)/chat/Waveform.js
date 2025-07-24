import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// style
//import 'video.js/dist/video-js.min.css'
//import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css'

// libraries
//import videojs from 'video.js'

//import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js'

import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'

const Waveform = ({ audio }) => {
  const containerRef = useRef()

  const waveSurferRef = useRef({
    isPlaying: () => false
  })
  const [isPlaying, toggleIsPlaying] = useState(false)

  var regions = [
    {
      start: 2.509953716438861,
      end: 4.689913517967433,
      data: {
        text: 'Hello down there on the good Earth'
      }
    },
    {
      start: 4.979908170464354,
      end: 7.339864652853083,
      data: {
        text: 'and all the best from the International space station. '
      }
    }
  ]
  useEffect(() => {
    const wv = async () => {
      const WaveSurfer = (await import('wavesurfer.js')).default

      const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        cursorWidth: 1,
        waveColor: '#eeefff',
        progressColor: '#0178FF',
        cursorColor: 'OrangeRed',
        barWidth: 2,
        barRadius: 2,
        height: 60,
        normalize: true,
        partialRender: true,
        backgroundColor: 'white'

        /* plugins: [
        WaveSurfer.regions.create({
          contentEditable: true,
          dragSelection: true,
          removeButton: true,
          regions
        }),
        WaveSurfer.minimap.create({
          height: 30,
          waveColor: '#ddd',
          progressColor: '#999'
        }),
        WaveSurfer.timeline.create({
          container: '#wave-timeline'
        }),
        WaveSurfer.cursor.create()
      ]*/
      })
      waveSurfer.load(audio)

      //use regions plugin monitoring to display subtitle
      //waveSurfer.getCurrentTime()//Gets current time
      //waveSurfer.getDuration()//gets audio duration
      //Example for subtitle: https://github.com/wavesurfer-js/wavesurfer.js/blob/master/example/video-annotation/main.js
      //Each textline from tx json should be a region

      waveSurfer.on('ready', () => {
        waveSurferRef.current = waveSurfer
      })

      /*return () => {
      waveSurfer.destroy()
    }*/
    }
    wv()
  }, [audio])

  return (
    <WaveSurferWrap>
      <button
        onClick={() => {
          waveSurferRef.current.playPause()
          toggleIsPlaying(waveSurferRef.current.isPlaying())
        }}
        type='button'
      >
        {isPlaying ? <FaPauseCircle size='3em' /> : <FaPlayCircle size='3em' />}
      </button>
      <div ref={containerRef} />
    </WaveSurferWrap>
  )
}

Waveform.propTypes = {
  audio: PropTypes.string.isRequired
}

const WaveSurferWrap = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  button {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
  }
`

export default Waveform
