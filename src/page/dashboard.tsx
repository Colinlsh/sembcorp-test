import mqtt from "mqtt";
import { useEffect, useState } from "react";
import { dh22Model } from "../app/models";

export default function Dashboard() {
  const [data, setData] = useState<dh22Model>({
    temperature: 0,
    humidity: 0,
  } as dh22Model);

  const client = mqtt.connect(import.meta.env.VITE_APP_WS_URL);

  useEffect(() => {
    const handleConnect = () => {
      client.subscribe("local/sensor/topic", (err) => {
        if (err) {
          console.error("Subscription error:", err);
        } else {
          console.log("Subscribed to topic: local/sensor/topic");
        }
      });
    };

    const handleMessage = (_: unknown, message: { toString: () => string }) => {
      const jsonData = JSON.parse(message.toString());
      setData(jsonData as dh22Model); // Assuming the data includes the 'dht_22' key
    };

    // Setup event listeners
    client.on("connect", handleConnect);
    client.on("message", handleMessage);
    client.on("error", (error) => {
      console.error("Connection failed:", error);
    });

    // Cleanup function
    return () => {
      client.end();
    };
  }, [client]);

  return (
    <div className="flex justify-center flex-col items-center gap-y-5">
      <h1 className="font-bold">Temperature: {data?.temperature}°C</h1>
      <h1 className="font-bold">Humidity: {data?.humidity}%</h1>
    </div>
  );
}
