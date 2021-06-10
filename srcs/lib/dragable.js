const draggable = ($elem, initX, initY, changeCenter) => e => {
  const offsetX = parseInt($elem.style.getPropertyValue('--left'), 10);
  const offsetY = parseInt($elem.style.getPropertyValue('--top'), 10);

  const startX = e.clientX;
  const startY = e.clientY;

  const moveAt = event => {
    const left = event.clientX - startX + (isNaN(offsetX) ? initX : offsetX);
    const top = event.clientY - startY + (isNaN(offsetX) ? initY : offsetY);
    $elem.style.setProperty('--left', left);
    $elem.style.setProperty('--top', top);
  };

  const mouseMove = event => {
    moveAt(event);
  };

  document.addEventListener('mousemove', mouseMove);

  document.onmouseup = () => {
    changeCenter();
    document.removeEventListener('mousemove', mouseMove);
    document.onmouseup = null;
  };
};

export default draggable;
