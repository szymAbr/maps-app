import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutingMachineLayer = ({ start, end, setSummary }) => {
  const instance = L.Routing.control({
    position: "topleft",
    // show: false,
    waypoints: [start, end],
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
  });

  instance.on("routesfound", function (e) {
    setSummary(e.routes[0].summary);
  });

  return instance;
};

// createControl hook
const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
