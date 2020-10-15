import React, { useState } from "react";

import "./tabOutros.css";

import Dropdown from "../TabGeral/components/dropdown/dropdown";
import LapDivision from "./componets/lapDivision";
import YawAcceleration from "./componets/yawAcceleration";

function TabOutros() {
  const [channelOption, setChannelOption] = useState([]);
  const channelsOpitions = {
    columns: ["Sobreposiçao de Voltas", "brake bias", "yaw acceleration"],
  };

  const renderSelectOption = () => {
    if (channelOption[0]) {
      switch (channelOption[0].column) {
        case "Sobreposiçao de Voltas":
<<<<<<< HEAD
          return <LapDivision></LapDivision>;
        case "yaw acceleration":
          return <YawAcceleration></YawAcceleration>;
        default:
          break;
=======
          return <LapDivision />;
>>>>>>> feab0fdd1689f6f837bdbee0eb5444e551edb1b8
      }
    }
  };

  return (
    <div id="tab-outros">
      <h1 className="tab-title">Outros tipos de graficos:</h1>
      <Dropdown
        data={channelsOpitions}
        label="Opçoes de Canais"
        name="ChannelOption"
        selectedAxis={(value) => setChannelOption(value)}
      />
      {renderSelectOption()}
    </div>
  );
}

export default TabOutros;
