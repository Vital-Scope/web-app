const Logo = ({ className = "" }: { className?: string }) => (
  <img
    src="/et.png"
    alt="Logo"
    className={className}
    style={{ background: "none" }}
    draggable={false}
  />
);

export default Logo;
