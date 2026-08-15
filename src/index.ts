import {handleIncoming} from "./validation";


handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" });
handleIncoming({ channel: "sms", to: "+380...", priority: "low" });
handleIncoming({ channel: "carrier-pigeon", text: "hi" });
handleIncoming(null);
handleIncoming("просто рядок");
