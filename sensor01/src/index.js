const { client, xml } = require("@xmpp/client");

const sensor1 = client({
  service: "xmpp://example.org",
  domain: "example.org",
  resource: "sensor01",
  username: "sensor01",
  password: "sensor1182520",
  tls: false, // Desabilita TLS
});

sensor1.on("online", (address) => {
  console.log(`Sensor 1 conectado como ${address}`);

  // Enviar dados para o sensor2 ap�s 3 segundos
  setInterval(() => {
    const date = new Date(Date.now());

    const temp = Math.random() * (50 - 10 + 1);
    const humildity = Math.random() * (100 - 10 + 1);

    const message = xml(
      "message",
      { type: "chat", to: "sensor02@example.org/sensor02" },
      xml(
        "body",
        {},
        `${temp.toFixed(2)}/${humildity.toFixed(
          2
        )}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      )
    );

    // Enviar a mensagem
    sensor1.send(message);
    console.log("Dados enviados para sensor1:");
    console.log(`Temperature: ${temp.toFixed(2)} Cº`);
    console.log(`Humidity: ${humildity.toFixed(2)} %`);
  }, 10000); // Enviar dados a cada 5 segundos*/
});

/*sensor1.on("stanza", (stanza) => {
  //  console.log(stanza.toString()); xml message
  if (stanza.is("message")) {
    const messageBody = stanza.getChildText("body");
    console.log("Mensagem recebida de sensor1:", messageBody);
  }
});*/

sensor1.on("error", (err) => {
  console.error("Erro no Sensor 1:", err);
});

sensor1.start().catch(console.error);
