const draggable = $elem => e => {
  const offsetX = parseInt($elem.style.getPropertyValue('--left'), 10);
  const offsetY = parseInt($elem.style.getPropertyValue('--top'), 10);

  const startX = e.clientX;
  const startY = e.clientY;

  const moveAt = event => {
    $elem.style.setProperty('--left', event.clientX - startX + (isNaN(offsetX) ? 0 : offsetX));
    $elem.style.setProperty('--top', event.clientY - startY + (isNaN(offsetX) ? 0 : offsetY));
  };

  const mouseMove = event => {
    moveAt(event);
  };

  document.addEventListener('mousemove', mouseMove);

  document.onmouseup = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.onmouseup = null;
  };
};

export default draggable;
