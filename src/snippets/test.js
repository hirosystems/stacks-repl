import { StacksMainnet } from "@stacks/network";
import { StackingClient } from "@stacks/stacking";

const network = new StacksMainnet();
const client = new StackingClient("", network);

const periodInfo = await client.getPoxOperationInfo();
console.log("🦁", periodInfo);
