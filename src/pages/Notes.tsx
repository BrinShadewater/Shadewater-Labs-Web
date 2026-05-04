import { useState } from 'react';
import CategoryChip from '../components/CategoryChip';
import ContentCard from '../components/ContentCard';
import { noteAuthorThemes, notes, type NoteAuthor } from '../content/notes';
import { BRIN_MARGOT_LOCKUP_ALT, BRIN_MARGOT_LOCKUP_SIZES, BRIN_MARGOT_LOCKUP_SRCSET } from '../lib/brandAssets';

interface NotesProps {
  onNavigate: (page: string, noteId?: string) => void;
}

export default function Notes({ onNavigate }: NotesProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [authorFilter, setAuthorFilter] = useState<string>('All');

  const categories = ['All', 'Movies', 'TV', 'Games', 'Tech', 'Products', 'AI', 'Books'];
  const types = ['All', 'Review', 'Video Review', 'Essay', 'Note'];
  const authors: Array<'All' | NoteAuthor> = ['All', 'Brin', 'Teegly', 'Krusher', 'Crafty'];

  const filteredNotes = notes.filter((note) => {
    const matchesCategory = categoryFilter === 'All' || note.category === categoryFilter;
    const matchesType = typeFilter === 'All' || note.type === typeFilter;
    const matchesAuthor = authorFilter === 'All' || note.author === authorFilter;
    return matchesCategory && matchesType && matchesAuthor;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-center">
        <img
          src="/brin-margot-logo-lockup.webp"
          srcSet={BRIN_MARGOT_LOCKUP_SRCSET}
          sizes={BRIN_MARGOT_LOCKUP_SIZES}
          width={900}
          height={675}
          alt={BRIN_MARGOT_LOCKUP_ALT}
          loading="eager"
          decoding="async"
          className="h-auto w-full max-w-[520px] drop-shadow-[0_18px_40px_hsl(210_66%_3%/0.28)]"
        />
      </div>

      <div className="text-center mb-12">
        <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">Reviews &amp; Notes</h1>
        <p className="mx-auto max-w-4xl text-lg font-semibold text-[hsl(var(--sandstone-soft))] md:text-xl">
          Reviews, Thoughts &amp; Essays on games, films, books, tech, products and{' '}
          <span className="notes-subtitle-emphasis">everything in between</span>
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 rounded-xl border-[4px] border-border bg-[hsl(220_20%_13%)] p-6 shadow-[0_4px_12px_hsl(0_0%_0%/0.3),0_0_20px_hsl(192_49%_14%/0.1)]">
        <div>
          <p className="text-sm font-semibold text-foreground/60 mb-3">FILTER BY CATEGORY</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                active={categoryFilter === category}
                onClick={() => setCategoryFilter(category)}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-foreground/70">Type</p>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <CategoryChip
                key={type}
                label={type}
                active={typeFilter === type}
                onClick={() => setTypeFilter(type)}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-foreground/70 mb-2">Author</p>
          <div className="flex flex-wrap gap-2">
            {authors.map((author) => {
              const theme = author === 'All' ? null : noteAuthorThemes[author];

              return (
                <CategoryChip
                  key={author}
                  label={author}
                  active={authorFilter === author}
                  onClick={() => setAuthorFilter(author)}
                  activeClassName={theme?.active}
                  inactiveClassName={theme ? `bg-[hsl(220_20%_13%)] border-2 ${theme.inactive}` : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <ContentCard
              key={note.id}
              title={note.title}
              category={note.category}
              type={note.type}
              author={note.author}
              excerpt={note.excerpt}
              date={note.date}
              heroImage={note.heroImage}
              onClick={() => onNavigate('post', note.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/50">No notes found with the selected filters.</p>
        </div>
      )}
    </div>
  );
}
