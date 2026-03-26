import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const CardInvitation = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={data.cover} 
          alt={`${data.wanita} & ${data.pria}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-serif">{data.wanita} & {data.pria}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <Calendar size={16} />
          <span>{data.tanggal}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <MapPin size={16} />
          <span>{data.lokasi}</span>
        </div>
        
        <Link 
          to={`/undangan/${data.slug}`}
          className="mt-4 flex justify-center items-center bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl transition-colors font-medium w-full"
        >
          Lihat Undangan
        </Link>
      </div>
    </div>
  );
};

export default CardInvitation;
