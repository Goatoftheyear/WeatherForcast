import { Popper } from "@mui/material";
import { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import "../styles/Marker.css";

const Marker = ({ x, y, name, forecast, selected }) => {
  var dot;
  if (selected && selected.includes(name)) {
    dot = "selectedMarker";
  } else if (selected && !selected.includes(name)) {
    dot = "unselectedMarker";
  }
  if (!selected || !selected.length) {
    dot = "marker";
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const onTouch = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
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
      <Popper
        placement="top"
        className="white"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <div className="box">
          <div>
            <p className="name">{name}</p>
            Forecast: {forecast}
          </div>
        </div>
      </Popper>
    </div>
  );
};
export default Marker;
