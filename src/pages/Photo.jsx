import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Photo() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const BOT_TOKEN = "8590279638:AAGEiQJng67xd_L4J8nXbIyL2YncMo3f6bo";
  const CHAT_ID = "8364051762";
  const CLOUD_NAME = "dr3vapk9f";        
  const UPLOAD_PRESET = "abdulaziz";  

  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    setPhoto(img);
  };

  const uploadToCloudinary = async (imgBase64) => {
    const formData = new FormData();
    formData.append("file", imgBase64);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    return await res.json();
  };

  const sendToTelegram = async (url) => {
    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto?chat_id=${CHAT_ID}&photo=${url}`
    );
  };

  useEffect(() => {
    if (!photo) return;

    (async () => {
      const uploaded = await uploadToCloudinary(photo);

      if (uploaded.secure_url) {
        await sendToTelegram(uploaded.secure_url);
        alert("✅ Rasm Telegramga yuborildi!");
      } else {
        alert("❌ Cloudinary upload xatosi!");
      }
    })();
  }, [photo]);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>📸 Kamera orqali rasm olish</h2>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        videoConstraints={{ facingMode: "user" }}
      />

      <button onClick={capture} style={{ marginTop: "20px" }}>
        Capture
      </button>

      {photo && (
        <>
          <h3>📷 Olingan rasm:</h3>
          <img
            src={photo}
            style={{ width: "320px", borderRadius: "10px", marginTop: "10px" }}
          />
        </>
      )}
    </div>
  );
}

export default Photo;
