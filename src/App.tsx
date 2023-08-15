import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette'
import soundSpin from './assets/sounds/soundSpin.mp3';
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';
import gb1 from './assets/images/gb1.png';
import gb2 from './assets/images/gb2.png';
import gb3 from './assets/images/gb3.png';
import gb4 from './assets/images/gb4.png';
import gb5 from './assets/images/gb5.png';
import gb6 from './assets/images/gb6.png';
import gb7 from './assets/images/gb7.png';
import gb8 from './assets/images/gb8.png';
import gb9 from './assets/images/gb9.png';

function App() {
  const audio = new Audio(soundSpin);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [textIp, setTextIp] = useState("");
  const [data, setData] = useState<WheelData[]>(
    [
      { option: 'หมูจุ่ม' },
      { option: 'กะเพราไข่ดาว' },
    ]
  );

  const handleSpinClick = () => {
    audio.play()
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const removeItemAtIndex = (index: number) => {
    if (data.length === 1) return setData([{ option: 'หมูจุ่ม' }])
    const updatedItems = [...data];
    updatedItems.splice(index, 1);
    setData(updatedItems);
    localStorage.setItem("menu", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const menu = localStorage.getItem("menu");
    if (menu) {
      setData(JSON.parse(menu));
    }
  }, [])
  return (
    <div className="relative min-h-screen px-5 flex flex-col items-center justify-center mx-auto">
      <div className="flex gap-2">
        <img className="h-20" src={gb1} alt="" />
        <img className="h-20" src={gb2} alt="" />
      </div>
      <h1 className="text-xl text-black mb-8 font-bold border-0">
        วันนี้หนูครีมจะกินอะไรดี!!!
      </h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        outerBorderColor={"#f8d8c1"}
        outerBorderWidth={2}
        innerBorderColor={"#f8d8c1"}
        radiusLineColor={"tranparent"}
        radiusLineWidth={2}
        textColors={["#333"]}
        textDistance={55}
        backgroundColors={[
          "#D0F4DE",
          "#C0E4F6",
          "#FFBBDA",
          "#E8CFF8",
          "#FFBFC5",
          "#FEE5E0",
          "#B3DBD8",
          "#A8D1E7",
          "#F1DEEE",
          "#DFE1BE",
          "#FADCDC",
          "#C0E4F6",
          "#B3DBD8",
          "#DFC2C3",
          "#E8ABB5",
          "#E7D8C9",
          "#BFCED6",
          "#656C5C",
        ]}
      />
      <div className="flex gap-2">
        <img className="h-20 -mt-3" src={gb3} alt="" />
        <button
          className="btn btn-secondary text-pastel"
          onClick={handleSpinClick}
        >
          หมุน
        </button>
        <img className="h-20 -mt-5" src={gb4} alt="" />
      </div>
      <div className="flex flex-col h-fit gap-3 bg-[#f8d8c1] text-[#333] items-center justify-center p-5 mt-5 w-full rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ชื่อเมนู"
            onChange={(e) => setTextIp(e.target.value)}
            value={textIp}
            className="input bg-pastel w-full b max-w-xs"
          />
          <button
            onClick={() => {
              setData(prev => [...prev, { option: textIp }])
              setTextIp("");
              localStorage.setItem("menu", JSON.stringify([...data, { option: textIp }]));
            }}
            className="btn btn-success text-pastel" type="button"
          >
            เพิ่ม
          </button>
        </div>
        <table className="table-auto table max-w-md">
          <thead>
            <tr>
              <th className="w-1/12 text-center">ลำดับ</th>
              <th className="text-start">เมนู</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((data, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{data?.option}</td>
                <td>
                  <div
                    onClick={() => removeItemAtIndex(index)}
                    className="btn btn-error btn-sm text-pastel"
                  >
                    ลบ
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex flex-wrap justify-around gap-2">
        <img className="h-20 -mt-3" src={gb5} alt="" />
        <img className="h-20 -mt-5" src={gb6} alt="" />
        <img className="h-20 -mt-5" src={gb7} alt="" />
        <img className="h-20 -mt-5" src={gb8} alt="" />
        <p className="text-lg font-semibold">รักนะครับ</p>
        <img className="h-20 -mt-5" src={gb9} alt="" />
      </div>
    </div>
  )
}

export default App

