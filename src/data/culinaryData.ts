import { Dish, ProgressionCourse, Reservation } from '../types';

export const DISHES_DATABASE: Dish[] = [
  {
    id: 'biryani-safran',
    archiveId: 'EO-CUL-074',
    courseRoman: 'VII',
    courseTitle: 'Course VII • Royal Awadh Legacy',
    badge: "Chef's Masterpiece",
    title: 'Slow-Cooked Dum Biryani',
    italicPart: 'au Safran',
    price: 2450,
    priceFormatted: '₹ 2,450',
    shortDescription: 'Aged Dehradun basmati, tender heritage lamb shank, sealed in antique handi pot with edible 24k gold leaf.',
    fullQuote: '"Tender mountain heritage lamb layered with 2-year aged Dehradun basmati, sealed in antique burnished copper handi with unleavened wheat dough, infused with slow smoke and edible 24k gold leaf."',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UesbfXaYh1LWio2ZzrI7KQItgqthDehxnVKQmX7WGQltIAt8bZz6CkwrDMxR2b1wHpPd7SjtXR8-qrf8l2i9J2w8mNZOhYWiipX_XVhVSAdss40vHctrQvdB8kYKIUySBhNk7OGH21BpwjiORQO_KyBaDyTb1kqaq5mCttz68IR82BZxdPA4zr3-Qr-_Eq1RaBlqZ3xtKMnj4ElhVG45L6wgD6bz9mCLsHCUdbg8Ihdl6cTj4PY3qutTfi',
    technique: '6-Hour Oak Embers Dum • Burnished Copper Handi • Wheat Dough Seal',
    sensoryProfile: 'Smoky cardamom vapour, saffron aromatics, tender shank melting into fragrant long-grain starch.',
    heroBadgeText: '24K Gold Leaf Foil',
    category: 'main',
    tags: ['gluten-free-modifiable', 'halal', 'live-hearth', 'nut-free'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Vintage Amarone della Valpolicella 2017 — The dried black plum notes, velvety tannins, and cedar tobacco essence echo the slow-cooked lamb and pierce through the opulent saffron ghee.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Core Botanicals & Rare Saffron',
        items: [
          {
            name: 'Kashmiri Mongra Saffron',
            origin: 'Pampore, Kashmir Valley',
            description: 'Grade A++ harvest; autumn hand-plucked stigmata, cold-steeped in whole buffalo milk for 12 hours.'
          },
          {
            name: 'Green Cardamom & Mace',
            origin: 'Coorg Estate, Karnataka',
            description: 'Single-origin whole mace flower arils & small-batch green pods gently crushed over hot coals.'
          },
          {
            name: 'Shahi Zira & Star Anise',
            origin: 'Himachal High Valleys',
            description: 'Wild-foraged black cumin seeds offering an intensely smoky, camphor-like aromatic finish.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Heritage Protein & Vedic Dairy',
        items: [
          {
            name: 'Grass-Fed Mountain Lamb',
            origin: 'Free-Range Foothills',
            description: 'Slow-braised shank & bone-in shoulder, cured with wild raw papaya and earthen spices for 36 hours.'
          },
          {
            name: 'A2 Vedic Gir Cow Ghee',
            origin: 'Bilona Churned • Gujarat',
            description: 'Traditional cultured curd-churned clarified butter, infused with scorched cinnamon quills.'
          },
          {
            name: 'Cultured Buffalo Curd',
            origin: 'Earthen Pot Ferment',
            description: 'Set for 18 hours in natural porous clay matkas to develop delicate acidity and velvet texture.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Heirloom Grains & Table Presentation',
        items: [
          {
            name: 'Taraori Basmati Grain',
            origin: '2-Year Aged • Dehradun',
            description: 'Aged extra-long kernels par-cooked al dente in saffron-steeped court bouillon before clay sealing.'
          },
          {
            name: '24K Edible Gold Leaf',
            origin: 'Varanasi Artisanal Beaters',
            description: 'Hand-hammered elemental auric foil placed over aromatic mint crown upon unsealing handi pot.'
          },
          {
            name: 'Birista & Wild Mint',
            origin: 'Estate Grown Herbs',
            description: 'Paper-thin shallots crisped in cold-pressed mustard oil, paired with wild-torn field spearmint.'
          }
        ]
      }
    ],
    allergens: ['Dairy (A2 Ghee & Curd)', 'Gluten-Free upon request', 'Halal Certified Lamb', 'Nut-Free']
  },
  {
    id: 'wagyu-nihari',
    archiveId: 'EO-CUL-061',
    courseRoman: 'VI',
    courseTitle: 'Course VI • Heritage Braise',
    badge: 'Signature Cut',
    title: 'Smoked Wagyu Short Rib Nihari',
    italicPart: 'au Moelle',
    price: 3200,
    priceFormatted: '₹ 3,200',
    shortDescription: 'Slow-braised in 18 ancestral nihari aromatics, charred tender spring alliums, glazed bone marrow jus.',
    fullQuote: '"Selected A5 Miyazaki Wagyu rib cuts gently braised for 48 hours in bone broth, finished over white oak coals with charred baby scallions and auric gold dust."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZCgd4Xe0RiygSkxvtR_dDuzrkNB8bYdfBgrsWrZx4kUh61fPBjntxfKBfKP7b45FYkWeucJOnLXqufwfbM-rJwQINgHvxvyIwWgw8syvlkRhDko92x6qa8pavdKOp4KGjafYhsT1xbSoZtSVmYXJRrUdwlIJQ51GvSP7fI_p1fsoB2hlG2-zKQlTMyPxJdCkAbx-aIaowdIJ38mQJ36uiM43eYq529HxyDbpl0BD8hZDHUDKMlW8OKg',
    technique: '48-Hour Low Temperature Simmer • Sal-Wood Embers Flash Sear • Reduction Glaze',
    sensoryProfile: 'Intense roasted marrow richness, caramelized ginger julienne, lime acidity, melting collagen texture.',
    heroBadgeText: 'Heritage 48-Hr Cut',
    category: 'main',
    tags: ['gluten-free-compliant', 'halal', 'live-hearth', 'nut-free'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Châteauneuf-du-Pape 2018 — Bold Grenache and Syrah tannins with black pepper spice and smoked garrigue cut through the decadent Wagyu marrow reduction.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Ancient Potent Aromatics',
        items: [
          {
            name: 'Peepli Long Pepper & Javitri',
            origin: 'Western Ghats Biosphere',
            description: 'Rare wild long peppers providing a deep medicinal warmth without harsh heat.'
          },
          {
            name: 'Sun-Dried Ginger (Saunth)',
            origin: 'Wayanad Organic Estates',
            description: 'Sun-cured ginger root micro-pulverized with toasted fennel and black cardamom pods.'
          },
          {
            name: 'Charred Spring Alliums',
            origin: 'Telangana Farm Direct',
            description: 'Young scallions blistered on direct oak coals until tender and smoky-sweet.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Prime Marrow & Heritage Beef',
        items: [
          {
            name: 'A5 Wagyu Short Rib',
            origin: 'Miyazaki Prefecture / Certified Halal',
            description: 'Exceptional intramuscular marbling slow-poached in its own natural tallow and aromatic stock.'
          },
          {
            name: 'Roasted Veal Bone Marrow',
            origin: 'Free-Range Pastoral Herds',
            description: 'Split canoe-cut bones roasted at 500° to render velvety gelatinous glaze.'
          },
          {
            name: 'Aged Mustard Oil Infusion',
            origin: 'Rajasthan Cold-Pressed Mills',
            description: 'Smoked kachi ghani mustard oil providing the customary piquancy.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Table Finish & Condiments',
        items: [
          {
            name: 'Fresh Julienne of Pahadi Ginger',
            origin: 'Uttarakhand Terroir',
            description: 'Crisp needle-thin slivers tossed in green lime juice for brightness.'
          },
          {
            name: 'Wild Coriander & Microgreens',
            origin: 'Estate Rooftop Hydroponic Garden',
            description: 'Young leaves harvested 30 minutes before table service.'
          },
          {
            name: 'Kashmiri Saffron Glaze',
            origin: 'Pampore Reserve',
            description: 'Golden auric gloss brushed onto the braised rib right before dining.'
          }
        ]
      }
    ],
    allergens: ['Dairy-Free Modifiable', 'Gluten-Free Compliant', 'Halal Certified', 'Nut-Free']
  },
  {
    id: 'paneer-tikka',
    archiveId: 'EO-CUL-033',
    courseRoman: 'III',
    courseTitle: 'Course III • Smoked Starters',
    badge: 'Vegetarian Tasting',
    title: 'Charcoal Paneer Tikka',
    italicPart: 'aux Fleurs Sauvages',
    price: 1650,
    priceFormatted: '₹ 1,650',
    shortDescription: 'Artisanal buffalo milk paneer cured in yellow mustard and smoked hung curd, seared over glowing sal-wood embers.',
    fullQuote: '"Hand-crafted buffalo paneer cured in fermented hung yogurt, yellow mustard seeds, and Himalayan rock salt, charred on open skewers over sal-wood embers and dressed with edible violas."',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UF4RVeDUceqdwu4IqnDdjeNlYptqs-49GtUMVyo5mhSkAKUJj9s19QY9WQyCfB8gbsfNSgYhs08vmWiw0vddbE-4JvTDovpKO49KhFIpqze8X7OXcAr_4rmNcl5tkwmW7mQSd6JqujXau3JceoLBRgg-ci7rR1qk-Edz0trhYJXVsWpR907Ai_JsQWMwo-TOyseVRbs38xqjEWS2BP19xBO_wE5WY4xlTPxnEn-rFi32cHduEerkK6Khc',
    technique: '24-Hour Mustard Cure • Hanging Sal-Wood Skewer • Charred Petal Dusting',
    sensoryProfile: 'Crisp smoky caramelization outside, warm molten cream center, zesty mustard punch, floral lift.',
    heroBadgeText: 'Artisanal Hearth',
    category: 'appetizer',
    tags: ['gluten-free-compliant', 'vegetarian', 'live-hearth', 'nut-free'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Sancerre Blanc 2020, Domaine Vacheron — Flinty limestone minerality, citrus blossom, and mouthwatering acidity contrast the smoky richness of the curd-basted paneer.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Mustard, Herbs & Wild Petals',
        items: [
          {
            name: 'Peepli & Yellow Mustard Seeds',
            origin: 'Madhya Pradesh Heritage Farms',
            description: 'Stone-ground mustard paste stone-milled with cold mountain spring water.'
          },
          {
            name: 'Wild Viola & Borage Petals',
            origin: 'Ooty Organic Floral Co-op',
            description: 'Edible fresh-cut organic petals imparting delicate herbaceous notes.'
          },
          {
            name: 'Dehydrated Mint & Black Salt',
            origin: 'Himalayan Foothills',
            description: 'Sun-dried wild field mint pulverized with volcanic kala namak crystals.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Artisanal Buffalo Dairy',
        items: [
          {
            name: 'Fresh Buffalo Milk Paneer',
            origin: 'Murrah Breed • In-House Daily Batch',
            description: 'Whole milk curdled with whey, gently pressed for 90 minutes to preserve high moisture.'
          },
          {
            name: 'Smoked Hung Curd (Chakka)',
            origin: 'Earthen Matka Fermentation',
            description: 'Thick creamy yogurt suspended over smoking dry cloves and hot charcoal.'
          },
          {
            name: 'Smoked A2 Cow Butter Emulsion',
            origin: 'Bilona Churned Dairy',
            description: 'Basted continuously over the glowing grill for glistening char.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Finishing Touches',
        items: [
          {
            name: 'Charred Meyer Lemon Wedge',
            origin: 'Nagpur Orchards',
            description: 'Caramelized citrus halves for table-side squeeze.'
          },
          {
            name: 'Herb Oil Emulsion Drops',
            origin: 'Cold-Pressed Basil & Coriander',
            description: 'Vibrant green herb droplets on dark slate plate.'
          },
          {
            name: 'Smoked Paprika Crystals',
            origin: 'Kashmiri Degi Mirch',
            description: 'Mild sweet chili flakes toasted in clay kiln.'
          }
        ]
      }
    ],
    allergens: ['Dairy (Buffalo Milk)', 'Gluten-Free Compliant', 'Vegetarian Selection', 'Nut-Free']
  },
  {
    id: 'caviar-flatbread',
    archiveId: 'EO-CUL-012',
    courseRoman: 'I',
    courseTitle: 'Course I • Raw & Embers',
    badge: 'Artisanal Sourdough',
    title: 'Smoked Trout Caviar Flatbread',
    italicPart: 'au Beurre de Baratte',
    price: 1850,
    priceFormatted: '₹ 1,850',
    shortDescription: 'Himalayan trout caviar, cultured mountain butter quenelle, blistered heirloom sourdough from our 600° clay oven.',
    fullQuote: '"Blistered heirloom sourdough cooked directly against the vertical terracotta walls of the tandoor, topped with cold-smoked trout roe, hand-churned salted cultured butter, and 24k gold leaf."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwdo_pwIssH96tdZI3Jj7iziDt3c8elIoPRL-4GC6b311DLTp1bACViBP8qIvUQsBG0wXyNYimvOmEt2ABQZOagB8iEmHeV1-ZuEPYLSIDurrNfdhelEvUJOIuhbE47ydZ5lrZOG6GtDOSkqwcIWxe4qwZaNJcuKl7KJYRlgdMl6IjdX2BXTXpFiDPn5fw8drWzUK0lksJL8FoRy4n326texzBRQu4foaaePALz7vKEbG6yo4Fu2ktTQ',
    technique: '600° Clay Oven Rapid Bake • Cold Applewood Caviar Smoke • Quenelle Plating',
    sensoryProfile: 'Crisp charred crust, pillowy sourdough crumb, popping briny caviar pearls, sweet grassy cream.',
    heroBadgeText: 'Wild Himalayan Roe',
    category: 'appetizer',
    tags: ['dairy-free-modifiable', 'nut-free', 'live-hearth'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Champagne Billecart-Salmon Brut Rosé — Lively bubbles, wild strawberry nuances, and brioche complexity elevate the briny trout pearls and warm charred dough.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Herbs & Sea Crystals',
        items: [
          {
            name: 'Fine Chives & Fresh Dill',
            origin: 'Estate Herb Garden',
            description: 'Delicate allium and anise notes finely snipped with bonsai shears.'
          },
          {
            name: 'Maldon Smoked Sea Salt',
            origin: 'Essex Coastlines',
            description: 'Pyramid flakes cold-smoked over English oak chips.'
          },
          {
            name: '24K Edible Gold Foil',
            origin: 'Varanasi Traditional Artisans',
            description: 'Delicate leaf accents shimmering across the caviar mound.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Cold-Water Fish Roe & Cultured Fat',
        items: [
          {
            name: 'Himalayan Golden Trout Caviar',
            origin: 'Kullu Glacial Waters, Himachal',
            description: 'Sustainably hand-harvested glistening golden amber beads, brined in light sea salt.'
          },
          {
            name: 'Cultured Mountain Butter (Baratte)',
            origin: 'Pahadi Cow Dairy, Manali',
            description: 'Slow-churned lactic butter with 86% butterfat, shaped into a silky quenelle.'
          },
          {
            name: 'Cold Applewood Smoke Infusion',
            origin: 'Orchard Pruning Charcoal',
            description: 'Light smoking chamber process giving gentle savory depth.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Ancient Fermented Grains',
        items: [
          {
            name: 'Heirloom Paighambari Wheat',
            origin: 'Ancient Grain Revival, Punjab',
            description: 'Unmodified ancient wheat variety boasting a low glycemic index and nutty aroma.'
          },
          {
            name: '7-Year Wild Sourdough Starter',
            origin: 'Ember & Oak Hearth Culture',
            description: '48-hour cold fermented dough yielding blistered leopards spots and chewy structure.'
          },
          {
            name: 'Cold-Pressed Olive Oil Brush',
            origin: 'Rajasthan Organic Grove',
            description: 'Light sheen applied as the flatbread emerges piping hot from the tandoor.'
          }
        ]
      }
    ],
    allergens: ['Contains Gluten', 'Dairy (Cultured Butter)', 'Fish (Trout Caviar)', 'Nut-Free']
  },
  {
    id: 'chocolate-fondant',
    archiveId: 'EO-CUL-092',
    courseRoman: 'IX',
    courseTitle: 'Course IX • Confections',
    badge: '72% Venezuelan Cacao',
    title: 'Smoked Chocolate Fondant',
    italicPart: 'au Coeur Coulant',
    price: 1450,
    priceFormatted: '₹ 1,450',
    shortDescription: 'Molten dark chocolate infused with applewood smoke, quenelle of Madagascar vanilla bean gelato, fleur de sel.',
    fullQuote: '"Single-origin Venezuelan dark chocolate baked to an unctuous molten core, perfumed with burning applewood curls, served with churned vanilla bean gelato and flakes of Maldon sea salt."',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VFLJYDyoEuvPXXuTK7XfYcSM06hl1g3dhrQ_YgWV-jJ2GHf5FzoOS0NnuTKsLP221yujxZMwe0oeech5MQfR-38X4d0zEF0SIw9KSH4jgNANvezMJh0gsIv5C-Q_tSEdHBJTTV3j3SJwmaNJlUEyuhv6kTiSJW6JGQ5aUvAMkn4OoI5eiMIebiYA9OXEMDCo6SWYf6NIXzD959qX5jLwBZ8WAuAVHYqyvxK0lrUVfkJZvjMaz4GWAL85Q',
    technique: 'Precision Hearth Center Bake • Applewood Smoke Cloche • Churned Gelato Quenelle',
    sensoryProfile: 'Bittersweet chocolate volcano, comforting campfire aromatics, cold sweet vanilla cream, salty crunch.',
    heroBadgeText: 'Final Revelation',
    category: 'dessert',
    tags: ['vegetarian', 'nut-free', 'gluten-free-modifiable'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Taylor Fladgate 20-Year Old Tawny Port — Fig, roasted hazelnut, and cigar box notes integrate seamlessly with the smokiness of the molten single-estate cacao.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Cacao & Botanical Infusion',
        items: [
          {
            name: '72% Single-Origin Venezuelan Criollo',
            origin: 'Chuao Valley Estate',
            description: 'Rare genetic strain celebrated for delicate notes of dried plums, molasses, and coffee.'
          },
          {
            name: 'Bourbon Vanilla Bean Gelato',
            origin: 'Sambava, Madagascar',
            description: 'Whole pod caviar scraped into fresh cream, frozen in Italian batch freezer.'
          },
          {
            name: 'Applewood Smoke Vapour',
            origin: 'Himachal Pruned Orchard Stems',
            description: 'Trapped beneath a cloche and released tableside in a dramatic scented plume.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Rich Dairy & Egg Custard',
        items: [
          {
            name: 'Pasture-Raised Hen Egg Yolks',
            origin: 'Bio-Dynamic Southern Valley Farms',
            description: 'Vibrant golden yolks whipped with unrefined raw muscovado sugar.'
          },
          {
            name: 'Grass-Fed Heavy Cream & Butter',
            origin: 'Nilgiri Mountain Dairy',
            description: 'Cultured unsalted butter melting into the decadent dark cake wall.'
          },
          {
            name: 'Single Estate Espresso Extract',
            origin: 'Araku Valley Tribal Terroir',
            description: 'A few drops to accentuate the roasted bitterness of dark cacao.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Auric Accents & Minerals',
        items: [
          {
            name: '24K Edible Gold Leaf Dust',
            origin: 'Varanasi Metal Guild',
            description: 'Flecked across the molten volcanic crater as it breaks open.'
          },
          {
            name: 'Maldon Smoked Sea Salt',
            origin: 'Maldon, UK',
            description: 'Crunchy delicate salt pyramid crystals balancing sweetness.'
          },
          {
            name: 'Micro Chocolate Soil Crumb',
            origin: 'Valrhona Cocoa Nib Toffee',
            description: 'Toasted crumb textured base beneath the gelato quenelle.'
          }
        ]
      }
    ],
    allergens: ['Dairy (Butter & Gelato)', 'Eggs', 'Gluten-Free upon request', 'Nut-Free']
  },
  {
    id: 'kulfi-nest',
    archiveId: 'EO-CUL-088',
    courseRoman: 'VIII',
    courseTitle: 'Course VIII • Sweets',
    badge: 'Spun Sugar Nest',
    title: 'Deconstructed Saffron Pistachio Kulfi',
    italicPart: 'au Nid de Sucre',
    price: 1350,
    priceFormatted: '₹ 1,350',
    shortDescription: 'Encased in hand-spun caramelized amber sugar nest, paired with cardamom rose water coulis and silver leaf.',
    fullQuote: '"Slow-reduced rabdi kulfi studded with Afghan green pistachios, cradled inside an architectural dome of spun sugar wire, finished with damask rose essence and edible silver vark."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIMzS0VVeSRdQFvc1262EP13fgaSmxqxHCW9CqEoeqR3amf-mjZMiEl0OsyxMrSEDzmcYr2NALJoaZCEPG5Espm01qJA8LzaD9-nhlr6LtsGKLBIeFhRgRMDAZmX6xjL1EfLw-M7AuoEfZyJ-poOJ8FnTm73iFYtANYxfYh3ZXxCnf7yFCX5Jh4JRslJPIemCKkARrq7Y2SFziNSGz-x91HISBvqxTplI_8cp5xyQsAi769HvndRLTDw',
    technique: '8-Hour Rabdi Reduction • Hand-Spun Caramelized Sugar Nest • Liquid Nitrogen Freeze',
    sensoryProfile: 'Crispy crackling sugar web, slow-melting dense cardamom cream, crunchy floral nuts, cold refreshing contrast.',
    heroBadgeText: 'Artisanal Spun Confection',
    category: 'dessert',
    tags: ['gluten-free-compliant', 'vegetarian'],
    pairing: {
      title: 'Sommelier Cellar Note • Glass Selection',
      description: 'Château d’Yquem Sauternes 2016 — Honeyed apricot, candied citrus, and toasted saffron notes harmonize with the reduced rabdi and pistachio crunch.'
    },
    ingredientGroups: [
      {
        id: 'botanicals',
        categoryNumber: '01',
        title: 'Saffron, Rose & Cardamom',
        items: [
          {
            name: 'Pampore Mongra Saffron',
            origin: 'Kashmir Valley Reserve',
            description: 'Steeped directly into the boiling buffalo milk to produce a royal sunny yellow tone.'
          },
          {
            name: 'Kannauj Organic Rose Water',
            origin: 'Kannauj Copper Distilleries',
            description: 'Ancient deg-bhapka distilled steam essence of Damascus rose petals.'
          },
          {
            name: 'Green Cardamom Pod Seeds',
            origin: 'Idukki Hills, Kerala',
            description: 'Freshly ground seeds releasing refreshing eucalyptus and pine notes.'
          }
        ]
      },
      {
        id: 'proteins',
        categoryNumber: '02',
        title: 'Condensed Rabdi & Heritage Milk',
        items: [
          {
            name: 'Slow-Simmered Buffalo Rabdi',
            origin: 'Local Dairy Herd, Hyderabad',
            description: 'Reduced in cast-iron kadhais for 8 hours until thick with layered malai skins.'
          },
          {
            name: 'Slivered Afghan Pistachios',
            origin: 'Herat Green Kernels',
            description: 'Vibrant emerald pistachios blanched and toasted in light ghee.'
          },
          {
            name: 'Alphonso Mango Coulis Droplets',
            origin: 'Ratnagiri Geographical Indication',
            description: 'Tangy fruit drops dotting the matte slate plate.'
          }
        ]
      },
      {
        id: 'grains',
        categoryNumber: '03',
        title: 'Architectural Spun Sugar & Silver',
        items: [
          {
            name: 'Caramelized Spun Sugar Nest',
            origin: 'Hand-Pulled Sugar Craft',
            description: 'Golden spun amber filaments formed into a delicate nest cradling the kulfi quenelle.'
          },
          {
            name: 'Chandi Vark (Artisanal Silver Foil)',
            origin: 'Traditional Varanasi Beaters',
            description: 'Pure 99.9% elemental silver leaves adorning the pistachio kulfi.'
          },
          {
            name: 'Candied Rose Buds',
            origin: 'Alwar Organic Farms',
            description: 'Miniature wild buds crystallized in organic cane syrup.'
          }
        ]
      }
    ],
    allergens: ['Dairy (Condensed Rabdi)', 'Contains Nuts (Pistachio)', 'Gluten-Free Compliant', 'Vegetarian']
  }
];

export const PROGRESSION_COURSES: ProgressionCourse[] = [
  {
    number: '01',
    stage: 'RAW & EMBERS',
    title: 'Trout Caviar',
    description: 'Charred flatbread, cultured butter, smoked salt.'
  },
  {
    number: '03',
    stage: 'HEARTH SEAR',
    title: 'Charcoal Tikka',
    description: 'Sal-wood coals, yellow mustard curd, micro mint.'
  },
  {
    number: '05',
    stage: 'INFUSION',
    title: 'Morel Yakhni',
    description: 'Kashmir gucchi, fermented whey broth, wild thyme.'
  },
  {
    number: '06',
    stage: 'REDUCTION',
    title: 'Wagyu Nihari',
    description: '48-hour bone marrow glaze, charred spring scallions.'
  },
  {
    number: '07',
    stage: 'DUM APEX',
    title: 'Biryani au Safran',
    description: 'Antique copper handi, 24k gold, Pampore saffron.',
    isApex: true
  },
  {
    number: '09',
    stage: 'CONFECTION',
    title: 'Smoked Fondant',
    description: 'Applewood dark cacao, bourbon vanilla quenelle.'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    confirmationCode: 'EO-HYD-9842',
    partySize: 2,
    date: 'Tonight, October 11, 2026',
    time: '8:30 PM',
    serviceEnclave: 'Chef Vikramaditya’s Counter (6 Seats)',
    status: 'Confirmed',
    guestName: 'H. Renuka',
    guestEmail: 'h.renuka123456@gmail.com',
    guestPhone: '+91 (040) 2345 6789',
    specialRequests: 'Autumn Degustation Menu with Sommelier Wine Pairing. Anniversary celebration.'
  },
  {
    id: 'res-2',
    confirmationCode: 'EO-HYD-7105',
    partySize: 4,
    date: 'Friday, October 24, 2026',
    time: '7:45 PM',
    serviceEnclave: 'Private Sommelier Wine Vault',
    status: 'Confirmed',
    guestName: 'H. Renuka',
    guestEmail: 'h.renuka123456@gmail.com',
    guestPhone: '+91 (040) 2345 6789',
    specialRequests: 'Nut-free options requested for two guests. Vintage Amarone della Valpolicella pre-decanted.'
  }
];
