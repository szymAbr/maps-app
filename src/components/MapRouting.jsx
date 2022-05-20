import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutingMachineLayer = (props) => {
  const instance = L.Routing.control({
    position: "topleft",
    // show: false,
    waypoints: [L.latLng(52.41133, 16.93065), L.latLng(52.21427, 21.02099)],
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
