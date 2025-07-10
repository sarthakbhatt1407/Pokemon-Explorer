import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
  Center,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function MainHome() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Color mode values
  const cardBg = "white";
  const headerColor = "#e3350d";
  const cardHoverBg = "gray.50";
  const imageBg = "gray.50";

  // Responsive values
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const imageSize = useBreakpointValue({ base: "80px", md: "120px" });
  const containerPadding = useBreakpointValue({ base: 4, md: 8 });

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );
        const data = await response.json();
        console.log(data);

        const pokemonList = data.results.map((pokemon, index) => {
          const id = index + 1;
          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        setPokemons(pokemonList);
        setFilteredPokemons(pokemonList);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [searchTerm, pokemons]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePokemonClick = (id) => {
    navigate(`/pokemon/${id}`);
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color={headerColor} thickness="4px" />
          <Text fontSize="lg">Loading Pokémon data...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Container maxW="3000px" py={containerPadding} px={containerPadding}>
      <VStack
        spacing={{ base: 4, md: 6 }}
        mb={{ base: 6, md: 8 }}
        textAlign="center"
      >
        <Heading as="h1" size={headingSize} color={headerColor}>
          Pokemon Explorer
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          Discover information about your favorite Pokemon
        </Text>
      </VStack>

      <Box
        maxW="500px"
        mx="auto"
        mb={{ base: 6, md: 8 }}
        px={{ base: 4, md: 0 }}
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={handleSearch}
            size={{ base: "md", md: "lg" }}
            borderRadius="full"
            padding={{ base: 3, md: 4 }}
          />
        </InputGroup>
      </Box>

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 3, md: 6 }}
      >
        {filteredPokemons.map((pokemon) => (
          <Box
            key={pokemon.id}
            bg={cardBg}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            cursor="pointer"
            margin={{ base: 2, md: 2 }}
            onClick={() => handlePokemonClick(pokemon.id)}
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "lg",
              bg: cardHoverBg,
            }}
          >
            <Box
              bg={imageBg}
              p={{ base: 3, md: 6 }}
              display="flex"
              justifyContent="center"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                boxSize={imageSize}
                objectFit="contain"
                fallbackSrc="https://via.placeholder.com/120?text=Loading..."
              />
            </Box>
            <VStack p={{ base: 2, md: 4 }} align="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "md", md: "lg" }}
                textTransform="capitalize"
              >
                {pokemon.name}
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                {pokemon.id.toString().padStart(2, "0")}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
