import { Popover } from "@mui/material";
import { useState } from "react";
const Marker = ({ x, y, name, forecast, selected }) => {
  var dot = "dot";

  if (selected && selected.includes(name)) {
    dot = "dot2";
  } else if (selected && !selected.includes(name)) {
    dot = "hidden";
  }
  if (selected && !selected.length) {
    dot = "dot";
  }
  //   useEffect(() => {
  //     if (name.includes(selected) && selected) {
  //       setDot("dot2");
  //     } else {
  //       setDot("dot");
  //     }
  //   }, [change]);
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
      ></span>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <div className="popover">
          Name: {name}
          <br />
          Forecast: {forecast}
        </div>
      </Popover>
    </div>
  );
};
export default Marker;
