function heart({ active }) {
  return active ? (
    <span className="text-red-400">♥</span>
  ) : (
    <span className="text-inherit">♥</span>
  );
}

export default heart;
