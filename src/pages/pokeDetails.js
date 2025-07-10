"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

export default function PokeDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPokemon(data);
      } catch (e) {
        setError("Failed to load Pokémon.");
      }
      setLoading(false);
    }
    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <Center h="100vh">
        <Spinner size="xl" color="#e3350d" thickness="4px" />
      </Center>
    );
  if (error)
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  if (!pokemon) return null;

  return (
    <Container
      maxW={"700px"}
      py={{ base: 4, md: 8 }}
      px={{ base: 2, md: 0 }}
      margin={"auto"}
    >
      <Flex
        direction="column"
        align="center"
        bg="white"
        p={{ base: 3, md: 6 }}
        borderRadius="lg"
        boxShadow="md"
      >
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          boxSize={{ base: "120px", md: "180px" }}
          mb={{ base: 3, md: 4 }}
        />
        <Heading
          as="h1"
          size={{ base: "md", md: "lg" }}
          color="#e3350d"
          textTransform="capitalize"
          mb={2}
          textAlign="center"
        >
          {pokemon.name}{" "}
          <Text as="span" color="gray.500" fontSize={{ base: "sm", md: "md" }}>
            #{pokemon.id}
          </Text>
        </Heading>
        <HStack spacing={2} mb={4} flexWrap="wrap" justify="center">
          {pokemon.types.map((t) => (
            <Box
              key={t.type.name}
              borderRadius="full"
              bg="gray.100"
              color="gray.700"
              fontWeight="bold"
              px={3}
              py={1}
              fontSize={{ base: "xs", md: "sm" }}
              textTransform="capitalize"
              mb={1}
            >
              {t.type.name}
            </Box>
          ))}
        </HStack>
        <Box w="100%" mb={6}>
          <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
            Abilities
          </Heading>
          <VStack align="start" spacing={1}>
            {pokemon.abilities.map((a) => (
              <Text
                key={a.ability.name}
                textTransform="capitalize"
                fontSize={{ base: "sm", md: "md" }}
              >
                {a.ability.name}{" "}
                {a.is_hidden && (
                  <Text as="span" color="purple.500" fontSize="sm">
                    (Hidden)
                  </Text>
                )}
              </Text>
            ))}
          </VStack>
        </Box>
        <Box w="100%" mb={6}>
          <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
            Stats
          </Heading>
          <VStack align="start" spacing={1}>
            {pokemon.stats.map((s) => (
              <Text
                key={s.stat.name}
                textTransform="capitalize"
                fontSize={{ base: "sm", md: "md" }}
              >
                {s.stat.name.replace("-", " ")}: <b>{s.base_stat}</b>
              </Text>
            ))}
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h3" size={{ base: "sm", md: "md" }} mb={2}>
            Moves{" "}
            <Text as="span" color="gray.500" fontSize="sm">
              (first 20)
            </Text>
          </Heading>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4 }}
            spacing={2}
            justifyItems="center"
          >
            {pokemon.moves.slice(0, 20).map((m) => (
              <Box
                key={m.move.name}
                borderRadius="full"
                bg="cyan.100"
                color="cyan.800"
                fontSize={{ base: "xs", md: "sm" }}
                mb={1}
                px={3}
                py={1}
                textAlign="center"
                textTransform="capitalize"
                w="fit-content"
              >
                {m.move.name}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
  );
}
