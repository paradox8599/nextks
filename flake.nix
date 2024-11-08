{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      flake-parts,
      systems,
      ...
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import systems;

      perSystem =
        { pkgs, ... }:
        {
          packages.default = pkgs.stdenv.mkDerivation {
            pname = "nextks";
            version = "0.1.0";
            src = ./.;

            nativeBuildInputs = with pkgs; [
              nodejs
            ];
          };

          apps = {
            default = {
              type = "app";
              program = toString (
                pkgs.writeShellScript "start-nextks" ''
                  ${pkgs.bun}/bin/bun -v
                ''
              );
            };
          };

          devShells = {
            default = pkgs.mkShell {
              buildInputs = with pkgs; [
                bun
                nodejs
              ];
              shellHook = ''
                ${pkgs.bun}/bin/bun -v
              '';
            };
          };
        };
    };
}
