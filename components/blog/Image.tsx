import Image from 'next/image';
export default function Named({src}) {
    return(
        <div id={"Image"}>
            <Image src={src} object-fit="contain"/>
        </div>
    )
}