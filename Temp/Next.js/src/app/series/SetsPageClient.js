"use client";

import { useState } from "react";
import Image from "next/image";

export default function SetsPageClient({ seriesData, setsData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [expandedSeries, setExpandedSeries] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Filter Series and Sets Based on Search Term
  const filteredSeries = seriesData.filter((series) => {
    const matchingSets = setsData.filter((set) =>
      set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      series.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matchingSets.some((set) => set.series === series.name)
    );
  });

  const filteredSets = setsData.filter((set) =>
    set.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Logic
  const sortedSeries = filteredSeries.sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "total-asc":
        return a.total - b.total;
      case "total-desc":
        return b.total - a.total;
      case "releaseDate-asc":
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      case "releaseDate-desc":
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      default:
        return 0;
    }
  });

  const sortedSets = filteredSets.sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "releaseDate-asc":
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      case "releaseDate-desc":
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      default:
        return 0;
    }
  });

  const getSetsForSeries = (seriesName) =>
    setsData.filter((set) => set.series === seriesName);

  return (
    <div className="min-h-screen bg-[#1c1b23] text-white p-4 pt-10">
{/* Header Section */}
<header className="flex flex-wrap items-center justify-between mb-6 gap-4 lg:gap-0 lg:flex-nowrap">
  {/* Pokémon Expansion Series */}
  <h1 className="text-4xl font-medium text-[#DDD8B8] mb-4 lg:mb-0 lg:text-left md:text-3xl">
    Pokémon Expansion Series
  </h1>

  {/* Combined Search and Sort for All Screens */}
  <div className="flex flex-wrap lg:flex-nowrap lg:flex-1 lg:justify-end lg:items-center gap-4">
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search series or sets..."
      className="px-4 py-2 rounded-lg bg-[#D9D9D91A] text-white placeholder-[#fffcfc] flex-grow md:max-w-[60%] xl:max-w-lg"
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* Sort Dropdown */}
    <select
      className="px-4 py-2 rounded-lg bg-[#4a417d] text-white lg:max-w-[20%]"
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="name-asc">↑ Name</option>
      <option value="name-desc">↓ Name</option>
      <option value="total-asc">↑ Total Cards</option>
      <option value="total-desc">↓ Total Cards</option>
      <option value="releaseDate-asc">↑ Release Date</option>
      <option value="releaseDate-desc">↓ Release Date</option>
    </select>
  </div>
</header>






      {/* Divider */}
      <div className="border-t-2 border-[#5da271] mb-6"></div>
      {/* Render Search Results */}
      {/* Search Results */}
      {searchTerm ? (
        <div>
          {/* Matching Series */}
          {sortedSeries.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#DDD8B8] mb-4">
                Matching Series
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedSeries.map((series) => (
                  <section
                    key={series.id}
                    className="relative bg-[#1c1b23] rounded-lg overflow-hidden hover:shadow-lg"
                  >
                    {/* Series Image */}
                    <div
                      className="relative group cursor-pointer"
                      onClick={() =>
                        setExpandedSeries(
                          expandedSeries === series.name ? null : series.name
                        )
                      }
                    >
                      <Image
                        src={series.LogoUrl || series.backupLogoUrl}
                        alt={`${series.name} Logo`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-contain group-hover:scale-105 transition-transform"
                      />
                      {/* Bottom Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-[#00000080] px-4 py-2 text-sm flex justify-between text-[#00c295]">
                        <span>{series.name}</span>
                        <span>{series.releaseDate}</span>
                      </div>
                      {/* Top Right Total Cards */}
                      <span
                        className="absolute top-2 right-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs"
                      >
                        {series.total} Cards
                      </span>
                      <a
                      href={`/series/${series.id}/cards`}
                      className="absolute inset-0"
                      aria-label={`View ${series.id} Cards`}
                      ></a>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

          {/* Matching Sets */}
          {sortedSets.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-[#DDD8B8] mb-4">
                Matching Sets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedSets.map((set) => (
                  <div
                    key={set.id}
                    className="relative bg-[#1c1b23] rounded-lg overflow-hidden hover:shadow-lg group"
                  >
                    <Image
                      src={set.LogoUrl || set.backupLogoUrl}
                      alt={`${set.name} Logo`}
                      width={300}
                      height={200}
                      className="w-full h-32 object-contain group-hover:scale-105 transition-transform"
                    />
                    {/* Bottom Bar for Sets */}
                    <div className="absolute inset-x-0 bottom-0 bg-[#00000080] px-4 py-1 text-xs flex justify-between text-[#00c295]">
                      <span>{set.name}</span>
                      <span>{set.releaseDate}</span>
                    </div>
                    {/* Top Left PTCGO Code */}
                    <span
                      className="absolute top-2 left-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs"
                    >
                      {set.ptcgoCode}
                    </span>
                    {/* Top Right Total Cards for Sets */}
                    <span
                      className="absolute top-2 right-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs"
                    >
                      {set.total} Cards
                    </span>
                    <a
                      href={`/sets/${set.id}/cards`}
                      className="absolute inset-0"
                      aria-label={`View ${set.name} Cards`}
                    ></a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Default view of Series */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSeries.map((series) => (
              <section
                key={series.id}
                className="relative bg-[#1c1b23] rounded-lg overflow-hidden hover:shadow-lg"
              >
              {/* Series Image */}
              <div
                className="relative group cursor-pointer"
                onClick={() =>
                  setExpandedSeries(expandedSeries === series.name ? null : series.name)
                }
              >
                <Image
                  src={series.LogoUrl || series.backupLogoUrl}
                  alt={`${series.name} Logo`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-contain group-hover:scale-105 transition-transform"
                />
                {/* Bottom Bar */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-[#00000080] px-4 py-2 text-sm flex justify-between ${
                    expandedSeries === series.name || "sm:opacity-0 sm:group-hover:opacity-100"
                  } transition-opacity text-[#00c295]`}
                >
                  <span>{series.name}</span>
                  <span>{series.releaseDate}</span>
                </div>
                {/* Top Right Total Cards */}
                <span
                  className={`absolute top-2 right-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs ${
                    expandedSeries === series.name || "sm:opacity-0 sm:group-hover:opacity-100"
                  } transition-opacity`}
                >
                  {series.total} Cards
                </span>
              </div>

              {/* Expanded Series Content */}
              {expandedSeries === series.name && (
                <div className="bg-[#26232f] p-4 rounded-lg mt-4">
                  <h2 className="text-lg font-bold text-[#DDD8B8] mb-4">
                    Sets in {series.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getSetsForSeries(series.name).map((set) => (
                      <div
                        key={set.id}
                        className="relative bg-[#1c1b23] rounded-lg overflow-hidden hover:shadow-lg group"
                      >
                        <Image
                          src={set.LogoUrl || set.backupLogoUrl}
                          alt={`${set.name} Logo`}
                          width={300}
                          height={200}
                          className="w-full h-32 object-contain group-hover:scale-105 transition-transform"
                        />
                        {/* Bottom Bar for Sets */}
                        <div
                          className={`absolute inset-x-0 bottom-0 bg-[#00000080] px-4 py-1 text-xs flex justify-between text-[#00c295] ${
                            expandedSeries === series.name || "sm:opacity-0 sm:group-hover:opacity-100"
                          } sm:py-2 transition-all sm:bottom-[-10px]`}
                        >
                          <span>{set.name}</span>
                          <span>{set.releaseDate}</span>
                        </div>
                        {/* Top Left PTCGO Code */}
                        <span
                          className={`absolute top-2 left-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs ${
                            expandedSeries === series.name || "sm:opacity-0 sm:group-hover:opacity-100"
                          } transition-opacity`}
                        >
                          {set.ptcgoCode}
                        </span>
                        {/* Top Right Total Cards for Sets */}
                        <span
                          className={`absolute top-2 right-2 bg-[#4a417d] text-white px-2 py-1 rounded-lg text-xs ${
                            expandedSeries === series.name || "sm:opacity-0 sm:group-hover:opacity-100"
                          } transition-opacity`}
                        >
                          {set.total} Cards
                        </span>
                        <a
                          href={`/sets/${set.id}/cards`}
                          className="absolute inset-0"
                          aria-label={`View ${set.name} Cards`}
                        ></a>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`/series/${series.id}/cards`}
                    className="mt-4 inline-block bg-[#64ffda] text-black font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#52dab6]"
                  >
                    View All Cards in {series.name}
                  </a>
                </div>
              )}
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
