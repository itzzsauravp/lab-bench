export function random_number_generator(mod_val) {
  return Math.floor((Math.random() * 90 + 10) % mod_val);
}

export function get_mid_point(vertex_a, vertex_b) {
  return {
    x: (vertex_a.x + vertex_b.x) / 2,
    y: (vertex_a.y + vertex_b.y) / 2,
  };
}

export function rand(upper_limit) {
  return Math.floor((Math.random() * upper_limit))
}