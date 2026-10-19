import fs from "fs";

const dishesPath = "src/data/dishes.json";
const dishes = JSON.parse(fs.readFileSync(dishesPath, "utf-8"));

// Master map of all 26 verified Cloudinary uploads in APFOOD folder
const uploads = {
  "pesarattu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792309950/APFOOD/pesarattu.jpg",
  "gutti-vankaya-kura": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310053/APFOOD/gutti-vankaya-kura.jpg",
  "ragi-sangati": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310240/APFOOD/ragi-sangati.jpg",
  "bongu-kodi": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310282/APFOOD/bongu-kodi.jpg",
  "chepala-pulusu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310331/APFOOD/chepala-pulusu.jpg",
  "pootharekulu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310402/APFOOD/pootharekulu.jpg",
  "gongura-mutton": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310789/APFOOD/gongura-mutton.jpg",
  "royyala-iguru": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310837/APFOOD/royyala-iguru.jpg",
  "punugulu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310902/APFOOD/punugulu.jpg",
  "pulihora": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792310991/APFOOD/pulihora.jpg",
  "kakinada-kaja": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792311060/APFOOD/kakinada-kaja.jpg",
  "gongura-pappu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792311119/APFOOD/gongura-pappu.jpg",
  "nellore-chepala-pulusu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792311291/APFOOD/nellore-chepala-pulusu.jpg",
  "natu-kodi-pulusu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792332923/APFOOD/natu-kodi-pulusu.jpg",
  "uggani": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792332992/APFOOD/uggani.jpg",
  "jonna-roti": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333048/APFOOD/jonna-roti.jpg",
  "ulava-charu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333115/APFOOD/ulava-charu.jpg",
  "tirupati-laddu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333221/APFOOD/tirupati-laddu.jpg",
  "kadapa-karam-dosa": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333474/APFOOD/kadapa-karam-dosa.jpg",
  "palli-pachadi": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333558/APFOOD/palli-pachadi.jpg",
  "bellam-pulusu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333641/APFOOD/bellam-pulusu.jpg",
  "madugula-halwa": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333727/APFOOD/madugula-halwa.jpg",
  "royyala-biryani": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333814/APFOOD/royyala-biryani.jpg",
  "konda-kodi-iguru": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792333901/APFOOD/konda-kodi-iguru.jpg",
  "araku-bamboo-biryani": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792334083/APFOOD/araku-bamboo-biryani.jpg",
  "bandar-laddu": "https://res.cloudinary.com/dro6n6co1/image/upload/v1792339072/APFOOD/bandar-laddu.jpg",
};

let updatedCount = 0;
for (const dish of dishes) {
  if (uploads[dish.slug]) {
    dish.image = uploads[dish.slug];
    updatedCount++;
  }
}

fs.writeFileSync(dishesPath, JSON.stringify(dishes, null, 2));
console.log(`Updated ${updatedCount} dishes in ${dishesPath} with live Cloudinary URLs.`);
