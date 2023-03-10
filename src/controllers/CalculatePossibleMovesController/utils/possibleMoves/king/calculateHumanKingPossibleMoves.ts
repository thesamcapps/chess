import {
  PossibleMove,
  Piece,
  PieceLocations,
  OneTimeOnlyMoveFlags,
} from "../../../../../types";
import checkIfSquareIsOccupiedByHumanPiece from "../helpers/checkIfSquareIsOccupiedByHumanPiece";
import determineIfAnyPossibleMovesCreateCheckOnHuman from "../helpers/determineIfAnyPossibleMovesCreateCheckOnHuman";

const calculateHumanKingPossibleMoves = (
  row: number,
  column: number,
  rookACastleEligible: boolean,
  rookBCastleEligible: boolean,
  pieceLocations: PieceLocations,
  oneTimeOnlyMoveFlags: OneTimeOnlyMoveFlags
) => {
  const possibleMoves: PossibleMove[] = [];

  possibleMoves.push({ location: { row: row + 1, column: column } });
  possibleMoves.push({ location: { row: row - 1, column: column } });
  possibleMoves.push({ location: { row: row, column: column + 1 } });
  possibleMoves.push({ location: { row: row, column: column - 1 } });
  possibleMoves.push({ location: { row: row + 1, column: column + 1 } });
  possibleMoves.push({ location: { row: row + 1, column: column - 1 } });
  possibleMoves.push({ location: { row: row - 1, column: column + 1 } });
  possibleMoves.push({ location: { row: row - 1, column: column + 1 } });

  if (rookACastleEligible) {
    let castlePossible = true;

    for (let i = column; i > 0; i--) {
      if (pieceLocations.matrix[0][i] === true) {
        castlePossible = false;
        break;
      }
    }

    if (
      castlePossible &&
      !checkIfSquareIsOccupiedByHumanPiece(pieceLocations, row, column - 2)
    ) {
      possibleMoves.push({
        location: { row: row, column: column - 2 },
        sideEffects: [
          { piece: Piece.HumanRookA, row: row, column: column - 1 },
        ],
      });
    }
  }

  if (rookBCastleEligible) {
    let castlePossible = true;

    for (let i = column; i < 8; i++) {
      if (pieceLocations.matrix[0][i] === true) {
        castlePossible = false;
        break;
      }
    }

    if (
      castlePossible &&
      !checkIfSquareIsOccupiedByHumanPiece(pieceLocations, row, column + 2)
    ) {
      possibleMoves.push({
        location: { row: row, column: column + 2 },
        sideEffects: [
          { piece: Piece.HumanRookB, row: row, column: column + 1 },
        ],
      });
    }
  }

  let possibleMovesCheckedForCheckOnHuman: PossibleMove[] = [];

  possibleMoves.forEach((possibleMove) => {
    if (
      !determineIfAnyPossibleMovesCreateCheckOnHuman(
        pieceLocations,
        Piece.HumanKing,
        possibleMove,
        oneTimeOnlyMoveFlags
      )
    ) {
      possibleMovesCheckedForCheckOnHuman.push(possibleMove);
    }
  });

  return possibleMovesCheckedForCheckOnHuman;
};

export default calculateHumanKingPossibleMoves;
