import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import List from '../List';
import { Review } from '../Sandbox';

const mockReviews: Review[] = [
  {
    email: 'test@example.com',
    rating: '4',
    text: 'Great product!',
  },
  {
    email: 'user@example.com',
    rating: '5',
    text: 'Excellent service',
  },
];



describe('List component', ()=> {
  test('renders heading', () => {
    render(<List reviews={[]}/>);
    expect(
//      { level: 2 } - Jest to dodatkowy warunek, który wskazuje, że szukamy nagłówka o poziomie 2 (czyli <h2>). 
//W HTML nagłówki mają różne poziomy, od <h1> do <h6>, gdzie level: 2 oznacza nagłówek drugiego poziomu (<h2>).
//name: /reviews/i - Określa, że szukamy nagłówka, którego tekst (nazwa) odpowiada wyrażeniu regularnemu /reviews/i. 
//Wyrażenie regularne /reviews/i oznacza, że tekst nagłówka musi zawierać słowo "reviews", bez względu na wielkość liter (flaga i oznacza ignorowanie wielkości liter).
      screen.getByRole('heading', {level:2, name:/reviews/i})
    ).toBeInTheDocument()
  })
})

describe('List Component', () => {


  test('renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);

    expect(screen.getByText('Reviews')).toBeInTheDocument();

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();

      const stars = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
