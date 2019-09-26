function generateColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .substr(-6)
  );
}

export const dibujarRectangulo = (ctx, id, x, y, ancho, alto) => {
  const color = generateColor();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
  ctx.fillStyle = "#fff";
  const xText = x + ancho / 2;
  const yText = y + alto / 2;
  ctx.fillText(id, xText, yText);
};
