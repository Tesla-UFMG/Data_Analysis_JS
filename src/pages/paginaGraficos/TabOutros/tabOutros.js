import React, { useState } from "react";

import "./tabOutros.css";

import Dropdown from "../TabGeral/components/dropdown/dropdown";
import LapDivision from "./componets/lapDivision";
import YawAcceleration from "./componets/yawAcceleration";
import BrakeBias from "./componets/brakeBias";
import YawMoment from "./componets/yawMoment";
import TorqueTotal from "./componets/torqueTotal";
import EficienciaInstantanea from "./componets/eficienciaInstantanea";
import EficienciaMedia from "./componets/eficienciaMedia";
import Torque2Motores from "./componets/torque2Motores";

function TabOutros() {
  const [channelOption, setChannelOption] = useState([]);
  const channelsOpitions = {
    columns: ["Sobreposiçao de Voltas", "Brake Bias", "Yaw acceleration", "Yaw moment", "Torque 2 motores", "Torque total", "Eficiência instantânea", "Eficiência média"],
  };

  const renderSelectOption = () => {
    if (channelOption[0]) {
      switch (channelOption[0].column) {
        case "Sobreposiçao de Voltas":
          return <LapDivision></LapDivision>;
        case "Yaw acceleration":
          return <YawAcceleration></YawAcceleration>;
        case "Brake Bias":
          return <BrakeBias></BrakeBias>;
        case "Yaw moment":
          return <YawMoment></YawMoment>;
        case "Torque total":
          return <TorqueTotal></TorqueTotal>;
        case "Torque 2 motores":
          return <Torque2Motores></Torque2Motores>;
        case "Eficiência instantânea":
          return <EficienciaInstantanea></EficienciaInstantanea>;
        case "Eficiência média":
          return <EficienciaMedia></EficienciaMedia>;
          
        default:
          break;
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
