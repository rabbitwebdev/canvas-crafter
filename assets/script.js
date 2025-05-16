document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-crafter");
  const ctx = canvas.getContext("2d");
  const colorPicker = document.getElementById("color-picker");
  const brushSize = document.getElementById("brush-size");
  const clearBtn = document.getElementById("clear-canvas");
  const saveBtn = document.getElementById("save-canvas");

  let drawing = false;
let startX, startY;
let currentTool = 'brush';

// Tool buttons
document.getElementById("tool-brush").addEventListener("click", () => setTool('brush'));
document.getElementById("tool-rect").addEventListener("click", () => setTool('rect'));
document.getElementById("tool-circle").addEventListener("click", () => setTool('circle'));

function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll("#tool-brush, #tool-rect, #tool-circle").forEach(btn => btn.classList.remove('active'));
  document.getElementById("tool-" + tool).classList.add('active');
}
    canvas.addEventListener("mousedown", e => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (currentTool === 'brush') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;

  if (currentTool === 'brush') {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSizeInput.value;
    ctx.lineCap = 'round';
    ctx.stroke();
  } else {
    // For shapes, redraw canvas snapshot + preview shape — handled on mouseup
    redrawCanvas();
    const width = e.offsetX - startX;
    const height = e.offsetY - startY;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSizeInput.value;

    if (currentTool === 'rect') {
      ctx.strokeRect(startX, startY, width, height);
    } else if (currentTool === 'circle') {
      const radius = Math.sqrt(width * width + height * height);
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
});

canvas.addEventListener("mouseup", e => {
  if (!drawing) return;
  drawing = false;

  if (currentTool !== 'brush') {
    const width = e.offsetX - startX;
    const height = e.offsetY - startY;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSizeInput.value;

    if (currentTool === 'rect') {
      ctx.strokeRect(startX, startY, width, height);
    } else if (currentTool === 'circle') {
      const radius = Math.sqrt(width * width + height * height);
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    saveCanvasSnapshot(); // Save after drawing shape
  } else {
    saveCanvasSnapshot();
  }
});
    
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
