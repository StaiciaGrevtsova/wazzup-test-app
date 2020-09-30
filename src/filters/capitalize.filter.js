export default function capitalizeFilter(value) {
  return value.charAt(0)
    .toUpperCase() + value.slice(1);
}
