type Params = Promise<{ locale: 'fi' | 'en' }>
import Image from 'next/image'
import { generateMeta } from '@/utilities/generateMeta'
import phoneImage from 'public/media/phone-1.png'

export async function generateMetadata() {
  return generateMeta({ doc: null })
}

export default async function Page({ params }: { params: Params }) {
  return (
    <>
      <section>
        <div className="relative mx-auto">
          <Image
            src={phoneImage}
            alt="Image of a phone"
            width="512"
            height="512"
            className="w-full max-h-40 md:max-h-80 object-cover rounded-b-2xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex flex-col items-center justify-center text-black">
            <p className="font-thin text-2xl text-center">UI on Ulkomuoto</p>
            <div className="flex items-baseline">
              <p className="font-normal text-4xl inline">UX</p>
              <p>on kokemus</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <p>
          Hyvä UI/UX tekee käyttämisestä helpompaa. Helppokäyttöisyys tarkoittaa tyytyväistä
          käyttäjää. Tyytyväinen käyttäjä on todennäköisempi asiakas.
        </p>
      </section>
    </>
  )
}
