document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-crafter");
  const ctx = canvas.getContext("2d");
  const colorPicker = document.getElementById("color-picker");
  const brushSize = document.getElementById("brush-size");
  const clearBtn = document.getElementById("clear-canvas");
  const saveBtn = document.getElementById("save-canvas");

  let drawing = false;


// Tool buttons
document.getElementById("tool-brush").addEventListener("click", () => setTool('brush'));
document.getElementById("tool-rect").addEventListener("click", () => setTool('rect'));
document.getElementById("tool-circle").addEventListener("click", () => setTool('circle'));

function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll("#tool-brush, #tool-rect, #tool-circle").forEach(btn => btn.classList.remove('active'));
  document.getElementById("tool-" + tool).classList.add('active');
}
    
  canvas.addEventListener("mousedown", () => drawing = true);
  canvas.addEventListener("mouseup", () => drawing = false);
  canvas.addEventListener("mousemove", draw);

  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  saveBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
  });

  // Init VisualScript
  const vs = new VisualScript.Editor("vs-editor", {
    toolbox: ["Set Brush Color", "Clear Canvas"],
    onRun: (node, value) => {
      if (node.type === "Set Brush Color") {
        colorPicker.value = value || "#ff0000";
      } else if (node.type === "Clear Canvas") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  });

  // Example nodes
  vs.addNode({ type: "Set Brush Color", value: "#ff0000" });
});
