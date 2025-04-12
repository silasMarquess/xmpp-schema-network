const { client, xml } = require("@xmpp/client");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", () => {
  console.log("new conection");
});

const sensor2 = client({
  service: "xmpp://example.org",
  domain: "example.org",
  resource: "sensor02",
  username: "sensor02",
  password: "sensor2182520",
  tls: false, // Desabilita TLS
});

sensor2.on("online", (address) => {
  console.log(`Sensor 2 conectado como ${address}`);

  // Enviar dados para o sensor2 ap�s 3 segundos
  /*setInterval(() => {
    const message = xml(
      "message",
      { type: "chat", to: "sensor01@example.org/sensor01" },
      xml("body", {}, "Hello")
    );

    // Enviar a mensagem
    sensor2.send(message);
    console.log("Dados enviados para sensor1:");
    console.log("Temperature: 25.05 °C");
    console.log("Humidity: 69.83 %");
  }, 5000); // Enviar dados a cada 5 segundos */
});

sensor2.on("stanza", (stanza) => {
  if (stanza.is("message")) {
    const messageBody = stanza.getChildText("body");
    console.log("Mensagem recebida de sensor1:", messageBody);

    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            message: messageBody,
          })
        );
        console.log("entrei");
      }
    });
  }
});

sensor2.on("error", (err) => {
  console.error("Erro no Sensor 1:", err);
});

sensor2.start().catch(console.error);
