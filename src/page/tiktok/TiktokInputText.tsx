interface TiktokInputTextProps {
  error: string;
  value: string;
  onChange: (str: string) => void;
  onClick: () => void;
}
const TiktokInputText: React.FC<TiktokInputTextProps> = ({
  error,
  value,
  onChange,
  onClick,
}) => {
  return (
    <input
      type="text"
      value={value}
      onClick={onClick}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Cole a URL do TikTok (ex. vm.tiktok.com/ZMSu)"
      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#1b1533]/60 border ${
        error ? "border-red-500" : "border-purple-700/30"
      } text-white placeholder-purple-300 text-sm md:text-base focus:outline-none focus:ring-2 ${
        error ? "ring-red-500" : "ring-purple-500/40"
      } drop-shadow-lg`}
    />
  );
};

export default TiktokInputText;
