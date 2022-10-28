import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import Abi from "./ABI/DNftAbi.json";

function Main() {
  const [accounts, setAccounts] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleConnect = async () => {
    if (window.ethereum) {
      const connectAccount = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(connectAccount);
    }
  };

  const getInputValue = (event) => setContractAddress(event.target.value);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const Signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Abi.abi, Signer);
      try {
        const response = await contract.Mint(BigNumber.from(amount));
        console.log("response:", response);
      } catch (e) {
        console.log("error:", e);
      }
    }
  };

  const handleIncrement = () => setAmount(amount + 1);

  const handleDecrement = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <label>enter nft contractAddress address</label>
          <input
            type="text"
            onChange={getInputValue}
            value={contractAddress}
            placeholder="contract address"
          />
          <div>
            {" "}
            <button onClick={handleIncrement}>+</button>
            <input type="number" value={amount} />
            <button onClick={handleDecrement}>-</button>
          </div>
          <div>
            <button onClick={handleMint}>mint</button>
          </div>
        </div>
      ) : (
        <button onClick={handleConnect}>connect</button>
      )}
    </div>
  );
}
export default Main;
