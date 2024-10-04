import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface CardProps {
  title: string;
  location: string;
  hostName: string;
  img: string;
  hostImage: string;
  rating: number;
  rent?: number;
  totalRent?: number;
  stayDates: string;
}

const Card: React.FC<CardProps> = ({
  title,
  location,
  hostName,
  img,
  hostImage,
  rating,
  rent,
  totalRent,
  stayDates,
}) => {
  return (
    <div className="rounded-lg overflow-hidden relative">
      <div className="relative">
        {/* Card Image */}
        <Image
          src={img} // Use the actual image URLs here
          alt={location}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-semibold">
          Guest favorite
        </div>
      </div>

      {/* Card Content */}
      <div>
        {/* Host Image and Name */}
        <div className="absolute top-32 left-4">
          <div className="relative w-16 h-20 bg-gray-200 shadow-lg rounded-r-lg overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full  overflow-hidden border-2 border-gray-200">
              <Image
                src={hostImage}
                width={0}
                height={0}
                sizes="100vw"
                alt={hostName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <h2 className="font-semibold line-clamp-1 h-5">{title}</h2>
          {/* Ratings */}
          <div className="flex items-center gap-x-1">
            <span className="text-sm ml-1">
              <FaStar size={14} />
            </span>
            <span className="font-semibold">{rating}</span>
          </div>
        </div>
        <p className="text-gray-500">Stay with {hostName}</p>
        <p className="text-gray-500">{stayDates}</p>
        <p className="font-bold mt-2">
          ${rent ? rent + " night" : totalRent + " total before taxes"}
        </p>
      </div>
    </div>
  );
};

export default Card;
