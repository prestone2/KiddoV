import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LazyGamesList from "@/components/LazyGamesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useGenres } from "@/hooks/useGenres";
import Seo from "@/components/Seo";

const Games = () => {
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState<string>("All Genres");
  const [deviceFilter, setDeviceFilter] = useState<string>("All Devices");
  const [genderFilter, setGenderFilter] = useState<string>("All Genders");

  const { data: genres } = useGenres();

  // Set genre filter from URL parameter
  useEffect(() => {
    const genre = searchParams.get("genre");
    if (genre && genres?.includes(genre)) {
      setGenreFilter(genre);
      setFilterOpen(true);
    }
  }, [searchParams, genres]);

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Games — Kiddovase"
        description="Explore kid-safe, educational games on Kiddovase. Browse puzzles, adventures, and creative challenges designed for fun learning."
        canonicalUrl={`${window.location.origin}/games`}
      ></Seo>

      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Games</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            <span>Filter</span>
          </Button>
        </div>
        <div className="mt-6 mb-6 space-y-4 leading-relaxed">
          <p>
            At Kiddovase, play is more than fun — it’s a powerful way for
            children to learn and grow. Every game on our platform has been
            designed or selected to spark creativity, build logical reasoning,
            and encourage teamwork. Whether kids are solving puzzles, exploring
            virtual worlds, or expressing themselves through art-based
            challenges, they’re always learning in a safe, ad-free environment.
          </p>
          <p>
            Our games are organized into educational categories like
            problem-solving, memory building, science adventures, and creative
            design. This helps parents and teachers easily find experiences that
            match a child’s interests or academic goals. All games are moderated
            to ensure they meet Kiddovase’s safety standards and maintain a
            positive, inclusive environment.
          </p>
          <p>
            As children progress, they unlock achievements and digital rewards
            that celebrate curiosity and persistence rather than competition.
            These badges motivate kids to keep exploring and developing
            confidence through discovery.
          </p>
          <p>
            Kiddovase believes in play with purpose — blending entertainment
            with education to help kids thrive both online and offline.
          </p>
        </div>
        {filterOpen && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-2">Genre</label>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Genres">All Genres</SelectItem>
                    {genres?.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-2">Device</label>
                <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Devices">All Devices</SelectItem>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Console">Console</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-2">Gender</label>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Genders">Boys & Girls</SelectItem>
                    <SelectItem value="Male">Boy</SelectItem>
                    <SelectItem value="Female">Girl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-roblox-blue hover:bg-roblox-blue/90"
                onClick={() => {
                  console.log("Filters applied:", {
                    genreFilter,
                    deviceFilter,
                    genderFilter,
                  });
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        <Tabs defaultValue="popular">
          <TabsList className="mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-0">
            <LazyGamesList
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
              sortType="popular"
            />
          </TabsContent>

          <TabsContent value="recommended">
            <LazyGamesList
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
              sortType="recommended"
            />
          </TabsContent>

          <TabsContent value="top-rated">
            <LazyGamesList
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
              sortType="top-rated"
            />
          </TabsContent>

          <TabsContent value="featured">
            <LazyGamesList
              genreFilter={genreFilter}
              deviceFilter={deviceFilter}
              genderFilter={genderFilter}
              pageSize={6}
              sortType="featured"
            />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Games;
