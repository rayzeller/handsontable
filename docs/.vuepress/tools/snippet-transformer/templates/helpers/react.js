const reactEvents = {
  copy: 'onCopy',
  copycapture: 'onCopyCapture',
  cut: 'onCut',
  cutcapture: 'onCutCapture',
  paste: 'onPaste',
  pastecapture: 'onPasteCapture',
  compositionend: 'onCompositionEnd',
  compositionendcapture: 'onCompositionEndCapture',
  compositionstart: 'onCompositionStart',
  compositionstartcapture: 'onCompositionStartCapture',
  compositionupdate: 'onCompositionUpdate',
  compositionupdatecapture: 'onCompositionUpdateCapture',
  focus: 'onFocus',
  focuscapture: 'onFocusCapture',
  blur: 'onBlur',
  blurcapture: 'onBlurCapture',
  change: 'onChange',
  changecapture: 'onChangeCapture',
  beforeinput: 'onBeforeInput',
  beforeinputcapture: 'onBeforeInputCapture',
  input: 'onInput',
  inputcapture: 'onInputCapture',
  reset: 'onReset',
  resetcapture: 'onResetCapture',
  submit: 'onSubmit',
  submitcapture: 'onSubmitCapture',
  invalid: 'onInvalid',
  invalidcapture: 'onInvalidCapture',
  load: 'onLoad',
  loadcapture: 'onLoadCapture',
  error: 'onError',
  errorcapture: 'onErrorCapture',
  keydown: 'onKeyDown',
  keydowncapture: 'onKeyDownCapture',
  keypress: 'onKeyPress',
  keypresscapture: 'onKeyPressCapture',
  keyup: 'onKeyUp',
  keyupcapture: 'onKeyUpCapture',
  abort: 'onAbort',
  abortcapture: 'onAbortCapture',
  canplay: 'onCanPlay',
  canplaycapture: 'onCanPlayCapture',
  canplaythrough: 'onCanPlayThrough',
  canplaythroughcapture: 'onCanPlayThroughCapture',
  durationchange: 'onDurationChange',
  durationchangecapture: 'onDurationChangeCapture',
  emptied: 'onEmptied',
  emptiedcapture: 'onEmptiedCapture',
  encrypted: 'onEncrypted',
  encryptedcapture: 'onEncryptedCapture',
  ended: 'onEnded',
  endedcapture: 'onEndedCapture',
  loadeddata: 'onLoadedData',
  loadeddatacapture: 'onLoadedDataCapture',
  loadedmetadata: 'onLoadedMetadata',
  loadedmetadatacapture: 'onLoadedMetadataCapture',
  loadstart: 'onLoadStart',
  loadstartcapture: 'onLoadStartCapture',
  pause: 'onPause',
  pausecapture: 'onPauseCapture',
  play: 'onPlay',
  playcapture: 'onPlayCapture',
  playing: 'onPlaying',
  playingcapture: 'onPlayingCapture',
  progress: 'onProgress',
  progresscapture: 'onProgressCapture',
  ratechange: 'onRateChange',
  ratechangecapture: 'onRateChangeCapture',
  seeked: 'onSeeked',
  seekedcapture: 'onSeekedCapture',
  seeking: 'onSeeking',
  seekingcapture: 'onSeekingCapture',
  stalled: 'onStalled',
  stalledcapture: 'onStalledCapture',
  suspend: 'onSuspend',
  suspendcapture: 'onSuspendCapture',
  timeupdate: 'onTimeUpdate',
  timeupdatecapture: 'onTimeUpdateCapture',
  volumechange: 'onVolumeChange',
  volumechangecapture: 'onVolumeChangeCapture',
  waiting: 'onWaiting',
  waitingcapture: 'onWaitingCapture',
  auxclick: 'onAuxClick',
  auxclickcapture: 'onAuxClickCapture',
  click: 'onClick',
  clickcapture: 'onClickCapture',
  contextmenu: 'onContextMenu',
  contextmenucapture: 'onContextMenuCapture',
  doubleclick: 'onDoubleClick',
  doubleclickcapture: 'onDoubleClickCapture',
  drag: 'onDrag',
  dragcapture: 'onDragCapture',
  dragend: 'onDragEnd',
  dragendcapture: 'onDragEndCapture',
  dragenter: 'onDragEnter',
  dragentercapture: 'onDragEnterCapture',
  dragexit: 'onDragExit',
  dragexitcapture: 'onDragExitCapture',
  dragleave: 'onDragLeave',
  dragleavecapture: 'onDragLeaveCapture',
  dragover: 'onDragOver',
  dragovercapture: 'onDragOverCapture',
  dragstart: 'onDragStart',
  dragstartcapture: 'onDragStartCapture',
  drop: 'onDrop',
  dropcapture: 'onDropCapture',
  mousedown: 'onMouseDown',
  mousedowncapture: 'onMouseDownCapture',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousemove: 'onMouseMove',
  mousemovecapture: 'onMouseMoveCapture',
  mouseout: 'onMouseOut',
  mouseoutcapture: 'onMouseOutCapture',
  mouseover: 'onMouseOver',
  mouseovercapture: 'onMouseOverCapture',
  mouseup: 'onMouseUp',
  mouseupcapture: 'onMouseUpCapture',
  select: 'onSelect',
  selectcapture: 'onSelectCapture',
  touchcancel: 'onTouchCancel',
  touchcancelcapture: 'onTouchCancelCapture',
  touchend: 'onTouchEnd',
  touchendcapture: 'onTouchEndCapture',
  touchmove: 'onTouchMove',
  touchmovecapture: 'onTouchMoveCapture',
  touchstart: 'onTouchStart',
  touchstartcapture: 'onTouchStartCapture',
  pointerdown: 'onPointerDown',
  pointerdowncapture: 'onPointerDownCapture',
  pointermove: 'onPointerMove',
  pointermovecapture: 'onPointerMoveCapture',
  pointerup: 'onPointerUp',
  pointerupcapture: 'onPointerUpCapture',
  pointercancel: 'onPointerCancel',
  pointercancelcapture: 'onPointerCancelCapture',
  pointerenter: 'onPointerEnter',
  pointerentercapture: 'onPointerEnterCapture',
  pointerleave: 'onPointerLeave',
  pointerleavecapture: 'onPointerLeaveCapture',
  pointerover: 'onPointerOver',
  pointerovercapture: 'onPointerOverCapture',
  pointerout: 'onPointerOut',
  pointeroutcapture: 'onPointerOutCapture',
  gotpointercapture: 'onGotPointerCapture',
  gotpointercapturecapture: 'onGotPointerCaptureCapture',
  lostpointercapture: 'onLostPointerCapture',
  lostpointercapturecapture: 'onLostPointerCaptureCapture',
  scroll: 'onScroll',
  scrollcapture: 'onScrollCapture',
  wheel: 'onWheel',
  wheelcapture: 'onWheelCapture',
  animationstart: 'onAnimationStart',
  animationstartcapture: 'onAnimationStartCapture',
  animationend: 'onAnimationEnd',
  animationendcapture: 'onAnimationEndCapture',
  animationiteration: 'onAnimationIteration',
  animationiterationcapture: 'onAnimationIterationCapture',
  transitionend: 'onTransitionEnd',
  transitionendcapture: 'onTransitionEndCapture'
};

/**
 * TODO, before merging: docs
 * @param nativeEventName
 * @returns {*}
 */
function nativeToReactEvent(nativeEventName) {
  return reactEvents[nativeEventName];
}

module.exports = {
  reactEvents,
  nativeToReactEvent
};
