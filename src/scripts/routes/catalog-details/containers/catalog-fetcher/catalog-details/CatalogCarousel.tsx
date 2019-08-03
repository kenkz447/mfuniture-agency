import * as React from 'react';
import { Card, Carousel, CarouselIndicators, CarouselItem } from 'reactstrap';

import { Img } from '@/domain/components';
import { Catalog } from '@/restful';

interface CatalogCarouselProps {
    readonly catalog: Catalog;
}

interface CatalogCarouselState {
    readonly activeIndex: number;
    readonly animating: boolean;
}

export class CatalogCarousel extends React.PureComponent<CatalogCarouselProps, CatalogCarouselState> {

    constructor(props: CatalogCarouselProps) {
        super(props);

        this.state = {
            activeIndex: 0,
            animating: false
        };
    }

    private readonly onExiting = () => {
        this.setState({
            animating: true
        });
    }

    private readonly onExited = () => {
        this.setState({
            animating: false
        });
    }

    private readonly next = () => {
        const { catalog } = this.props;
        const { photos } = catalog;
        const { activeIndex, animating } = this.state;

        if (animating) {
            return;
        }

        const nextIndex =
            activeIndex === photos.length - 1 ? 0 : activeIndex + 1;

        this.setState({
            activeIndex: nextIndex
        });
    }

    private readonly previous = () => {
        const { catalog } = this.props;
        const { photos } = catalog;
        const { activeIndex, animating } = this.state;

        if (animating) {
            return;
        }

        const nextIndex =
            activeIndex === 0 ? photos.length - 1 : activeIndex - 1;

        this.setState({
            activeIndex: nextIndex
        });
    }

    private readonly goToIndex = newIndex => {
        const { animating } = this.state;

        if (animating) {
            return;
        }

        this.setState({
            activeIndex: newIndex
        });
    }

    public render() {
        const { catalog } = this.props;
        const { photos } = catalog;

        const { activeIndex } = this.state;

        return (
            <Card className="page-carousel">
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators
                        items={photos}
                        activeIndex={activeIndex}
                        onClickHandler={this.goToIndex}
                    />
                    {photos.map((photo) => {
                        return (
                            <CarouselItem
                                onExiting={this.onExiting}
                                onExited={this.onExited}
                                key={photo.url}
                            >
                                <Img file={photo} />
                            </CarouselItem>
                        );
                    })}
                    <a
                        className="left carousel-control carousel-control-prev"
                        data-slide="prev"
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            this.previous();
                        }}
                        role="button"
                    >
                        <span className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="right carousel-control carousel-control-next"
                        data-slide="next"
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            this.next();
                        }}
                        role="button"
                    >
                        <span className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                    </a>
                </Carousel>
            </Card>
        );
    }
}
