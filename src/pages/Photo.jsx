import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam';

function Photo() {
   const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);


  const sendToTelegram = async () => {
  if (!photo) return alert("Avval rasm oling!");

  const response = await fetch("http://localhost:5000/send-photo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: photo }),
  });

  const text = await response.text();
  alert(text);
};

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // 📷 rasmni olamiz
    setPhoto(imageSrc); // 🔽 rasmni pastda chiqarish uchun saqlaymiz
  };
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>📸 Kamera orqali rasm olish</h2>

      {/* Kamera oynasi */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        videoConstraints={{ facingMode: "user" }} // old kamera
      />

      {/* Tugma */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={capture}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📷 Rasm olish
        </button>
      </div>

      {/* Olingan rasmni chiqarish */}
      {photo && (
        <div style={{ marginTop: "20px" }}>
          <h3>📷 Siz olgan rasm:</h3>
          <img
            src={photo}
            alt="Olingan rasm"
            style={{
              width: "320px",
              height: "240px",
              borderRadius: "10px",
              border: "2px solid #333",
            }}
          />
        </div>
      )}
      <button onClick={sendToTelegram}>send tg</button>
    </div>
  )
}

export default Photo