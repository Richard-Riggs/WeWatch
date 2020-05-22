const sizes = {
  xs : '576px',
  sm : '768px',
  md : '992px',
  lg : '1200px',
  xl : '1600px'
};

export default {
  down : (size) => `@media (max-width: ${sizes[size]})`,
  up   : (size) => `@media (min-width: ${sizes[size]})`
};
