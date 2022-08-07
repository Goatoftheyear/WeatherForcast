import { Popover } from "@mui/material";
import { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import "./Marker.css";

const Marker = ({ x, y, name, forecast, selected }) => {
  var dot;
  if (selected && selected.includes(name)) {
    dot = "selectedMarker";
  } else if (selected && !selected.includes(name)) {
    dot = "unselectedMarker";
  }
  if (selected && !selected.length) {
    dot = "marker";
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const onTouch = (e) => {
    console.log("ea sports");
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <span
        onMouseEnter={onTouch}
        onMouseLeave={handleClose}
        className={dot}
        style={{
          zIndex: "1",
          marginLeft: `${x}px`,
          marginTop: `${y}px`,
          position: "absolute",
        }}
      >
        <RoomIcon fontSize="large" />
      </span>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className="popover">
          <div>Name: {name}</div>
          <div> Forecast: {forecast}</div>
        </div>
      </Popover>
    </div>
  );
};
export default Marker;
