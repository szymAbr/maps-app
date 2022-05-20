import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutingMachineLayer = ({ start, finish }) => {
  const instance = L.Routing.control({
    position: "topleft",
    // show: false,
    waypoints: [start, finish],
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
  });

  return instance;
};

// createControl hook
const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
