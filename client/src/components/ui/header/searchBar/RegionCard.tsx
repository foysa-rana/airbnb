import Image from "next/image";

interface RegionCardProps {
  name: string;
  imageUrl: string;
  setLocation: (name: string) => void;
}

const RegionCard = ({ name, imageUrl, setLocation }: RegionCardProps) => {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
      <Image
        src={imageUrl}
        alt={name}
        className="w-24 h-24 mb-2 object-contain rounded-lg border"
        width={0}
        height={0}
        sizes="100vw"
        onClick={() => setLocation(name)}
      />
      <span className="text-center text-sm font-medium">{name}</span>
    </div>
  );
};

export default RegionCard;
