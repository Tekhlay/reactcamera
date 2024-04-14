import React, { useState } from "react";
import Webcam from "react-webcam";
import { FaToggleOn, FaCamera } from "react-icons/fa";

const videoConstraints = {
  width: 400,
  height: 600,
  facingMode: "environment",
};

const Profile = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [isFrontcamera, setIsFontcamera] = useState(true);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const newImageSrc = webcamRef.current.getScreenshot();
    setImageSrc(newImageSrc);
    setIsCameraActive(false); // Stop the camera after capturing the photo
    setIsPhotoTaken(true); // Set the flag to indicate that the photo is taken
  }, [webcamRef, setImageSrc, setIsCameraActive]);

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setImageSrc(''); // Reset the image source when the camera is started
    setIsPhotoTaken(false); // Reset the flag when the camera is started
  };

  const handleRetakePhoto = () => {
    setIsCameraActive(true); // Restart the camera
    setImageSrc(''); // Reset the image source when retaking the photo
    setIsPhotoTaken(false); // Reset the flag when retaking the photo
  };

  const handleSwitchCamera = () => {
    setIsFontcamera(!isFrontcamera);
    videoConstraints.facingMode = isFrontcamera ? "environment" : "user";
  };

  const handleNext = () => {
    // Handle the "Next" button click here
  };

  return (
    <div>
      <h2 className="mb-5 text-center text-primary">
        Take camera with React
      </h2>
      <div className="d-flex justify-content-center">
        {imageSrc === '' && !isCameraActive ? (
          <button onClick={handleStartCamera} className="btn btn-primary mt-3">
            Start Camera
          </button>
        ) : (
          <>
            {isCameraActive && (
              <div className="d-flex flex-column position-relative">
                <Webcam
                  audio={false}
                  height={400}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  videoConstraints={videoConstraints}
                />
                <div className="camera-controls position-absolute bottom-0 start-50 translate-middle-x">
                  <button onClick={handleSwitchCamera} className="btn btn-light me-2">
                    <fa FaToggleOn />
                  </button>
                
                {!isPhotoTaken && (
                  <button onClick={capture} className="btn btn-primary mt-3">
                    <FaCamera/>
                  </button>
                )}
              </div>
              </div>
            )}
            {imageSrc !== '' && (
              <div>
                <img src={imageSrc} alt="captured" />
              </div>
            )}
            {imageSrc !== '' && (
              <div className="d-flex justify-content-center">
                <button onClick={handleRetakePhoto} className="btn btn-danger mt-3">
                  Retake photo
                </button>
                {isPhotoTaken && (
                  <button onClick={handleNext} className="btn btn-primary mt-3 ml-3">
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;