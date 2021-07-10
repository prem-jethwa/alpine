import { TileLayer, LayersControl, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { REACT_APP_APPID } = process.env;

const AllLayers = ({ latLon }) => {
  const fillBlueOptions = { fillColor: "red", color: "blue" };

  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="Just Map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="Show Clouds">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${REACT_APP_APPID}`}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name="Show Precipitation">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${REACT_APP_APPID}`}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Show Pressure">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${REACT_APP_APPID}`}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Show Wind">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${REACT_APP_APPID}`}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Show Temprature">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${REACT_APP_APPID}`}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay checked name="Where I am?">
        {/* <Marker position={latLon}>
          <Popup> */}
        <Circle center={latLon} pathOptions={fillBlueOptions} radius={12000} />
        {/* </Popup>
        </Marker> */}
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default AllLayers;
