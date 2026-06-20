import CardReview from "@/components/common/CardReviews";
import CarouselItems from "@/components/common/CarrouselItems";

export default function CarrouselReviews({title, size, reviews}) {

    return (
        <CarouselItems
            chunkSize={size}
            title={title}
            items={reviews} >
            {(item) => (
                <CardReview
                    key={item.id}
                    {...item}
                />
            )}
        </CarouselItems>
    )
}