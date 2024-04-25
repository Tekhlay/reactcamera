import React, { useState, useRef } from 'react';

function CameraCapture() {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCapture = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setCapturing(false);
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      stopCapture();
    }
  };

  return (
    <div>
      {capturedImage ? (
        <div>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
          <button onClick={() => setCapturedImage(null)}>Take Another</button>
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay playsInline muted style={{ maxWidth: '100%' }} />
          {!capturing && <button onClick={startCapture}>Start Camera</button>}
          {capturing && <button onClick={takeSnapshot}>Take Photo</button>}
          {capturing && <button onClick={stopCapture}>Stop Camera</button>}
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
