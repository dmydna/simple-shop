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
                    id={item.id}
                    comment={item.comment}
                    rating={item.rating}
                    date={item.date}
                />
            )}
        </CarouselItems>
    )
}