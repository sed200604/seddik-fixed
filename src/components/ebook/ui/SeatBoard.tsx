'use client';

interface SeatBoardProps {
  taken?: number;
  yourSeat?: number;
}

type SeatState = 'taken' | 'yours' | 'available';

interface SeatData {
  number: number;
  state: SeatState;
}

function getSeatClass(state: SeatState): string {
  const base = 'ebook-seat';
  switch (state) {
    case 'taken':
      return `${base} ebook-seat-taken`;
    case 'yours':
      return `${base} ebook-seat-yours`;
    case 'available':
      return `${base} ebook-seat-available`;
  }
}

export default function SeatBoard({
  taken = 6,
  yourSeat = 7,
}: SeatBoardProps) {
  const seats: SeatData[] = Array.from({ length: 10 }, (_, i) => {
    const seatNumber = i + 1;
    let state: SeatState;

    if (seatNumber === yourSeat) {
      state = 'yours';
    } else if (seatNumber <= taken) {
      state = 'taken';
    } else {
      state = 'available';
    }

    return { number: seatNumber, state };
  });

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
      aria-label="لوحة المقاعد المتاحة"
      role="group"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          maxWidth: '24rem',
        }}
      >
        {seats.map((seat) => (
          <div key={seat.number} style={{ position: 'relative' }}>
            <div
              className={getSeatClass(seat.state)}
              aria-label={
                seat.state === 'taken'
                  ? `مقعد ${seat.number} — محجوز`
                  : seat.state === 'yours'
                    ? `مقعد ${seat.number} — مقعدك`
                    : `مقعد ${seat.number} — متاح`
              }
            >
              {seat.state === 'taken' ? (
                <span aria-hidden="true" style={{ textDecoration: 'line-through' }}>
                  {seat.number}
                </span>
              ) : (
                <span>{seat.number}</span>
              )}
            </div>

            {seat.state === 'yours' && (
              <span
                className="ebook-mono"
                style={{
                  position: 'absolute',
                  insetBlockStart: '-1.75rem',
                  insetInlineStart: '50%',
                  transform: 'translateX(50%)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-ebook-gold)',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                }}
                aria-hidden="true"
              >
                أنت هنا ←
              </span>
            )}
          </div>
        ))}
      </div>

      <span
        className="ebook-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-ebook-text-secondary)',
          letterSpacing: '0.05em',
        }}
      >
        يتم التحديث شهرياً
      </span>
    </div>
  );
}
